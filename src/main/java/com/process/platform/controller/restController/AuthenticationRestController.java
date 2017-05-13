package com.process.platform.controller.restController;

import com.google.api.client.googleapis.auth.clientlogin.ClientLogin;
import com.process.platform.entity.jwt.EmailToken;
import com.process.platform.entity.jwt.JwtAuthenticationRequest;
import com.process.platform.entity.jwt.Token;
import com.process.platform.entity.user.User;
import com.process.platform.entity.user.UserRole;
import com.process.platform.service.google.GoogleAuthService;
import com.process.platform.service.impl.UserService;
import com.process.platform.service.security.JwtAuthenticationResponse;
import com.process.platform.service.security.JwtTokenService;
import com.process.platform.utils.Jwt.EmailUtils;
import com.process.platform.utils.errors.ErrorMessage;
import com.process.platform.utils.errors.ErrorStatus;
import io.jsonwebtoken.ExpiredJwtException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/api/auth", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class AuthenticationRestController {

    private static final Logger logger = Logger.getLogger(AuthenticationRestController.class);

    @Value("${jwt.header}")
    private String tokenHeader;

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;
    private final GoogleAuthService googleAuthService;
    private final EmailUtils emailUtils;

    @Autowired
    public AuthenticationRestController(UserService userService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtTokenService jwtTokenService, GoogleAuthService googleAuthService, EmailUtils emailUtils) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtTokenService = jwtTokenService;
        this.googleAuthService = googleAuthService;
        this.emailUtils = emailUtils;
    }

    @RequestMapping(value = "/createAuthToken", method = RequestMethod.POST)
    public ResponseEntity createAuthToken(@Valid @RequestBody JwtAuthenticationRequest jwtAuthenticationRequest) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                = new UsernamePasswordAuthenticationToken(
                jwtAuthenticationRequest.getEmail(),
                jwtAuthenticationRequest.getPassword()
        );
        final Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            logger.info(authentication);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body("Такого юзера нет");
        }
        User user = userService.findByEmail(jwtAuthenticationRequest.getEmail());
        String token = jwtTokenService.generateToken(user);
        logger.info(token);
        return ResponseEntity.ok(new JwtAuthenticationResponse(token));
    }

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public ResponseEntity registerUser(@Valid @RequestBody User user) {
        if (userService.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(200).body(ErrorMessage.EMAIL_NOT_UNIQUE);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreation_date(new Date());
        user.setRole(UserRole.NO_TEAM);
        user.setCaptain(false);
        String token = jwtTokenService.generateEmailConfirmationToken(user);
        try {
            emailUtils.confirmRegistration(token, user);
        } catch (MessagingException e) {
            return null;
        }
        logger.info(user);
        return ResponseEntity.ok(new JwtAuthenticationResponse(token));
    }

    @RequestMapping(value = "/confirm_registration", method = RequestMethod.GET)
    public ResponseEntity confirmRegistration(@RequestHeader("token") String tokenHeader, HttpServletRequest request) {
        EmailToken emailToken = jwtTokenService.getClaimsFromEmailToken(tokenHeader);
        if (emailToken == null)
            return ResponseEntity.status(200).body(ErrorMessage.TOKEN_EXPIRED);
        User user = userService.findByEmail(emailToken.getEmail());
        if (user == null)
            return null;
        userService.saveUser(user);
        return ResponseEntity.ok(true);
    }

    @RequestMapping(value = "/google_auth", method = RequestMethod.POST)
    public ResponseEntity googleAuth(@RequestBody JwtAuthenticationResponse jwtAuthenticationResponse) {
        User user;
        try {
            user = googleAuthService.authenticateUserFromGoogle(jwtAuthenticationResponse.getToken());
        } catch (GeneralSecurityException | IOException e) {
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body("Bad Request");
        }
        final String token = jwtTokenService.generateToken(user);
        return ResponseEntity.ok(new JwtAuthenticationResponse(token));
    }

    @RequestMapping(value = "/refresh_token", method = RequestMethod.GET)
    public ResponseEntity refreshToken(HttpServletRequest request) {
        String header = request.getHeader(tokenHeader);
        Token token = jwtTokenService.getClaimsFromToken(header);
        if (token == null)
            return ResponseEntity.status(200).body(ErrorMessage.INVALID_TOKEN_HEADER);
        User user = userService.findByEmail(token.getEmail());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("UNAUTHORIZED");
        }
        if (jwtTokenService.canTokenBeRefreshed(token)) {
            String refreshedToken = jwtTokenService.generateToken(user);
            return ResponseEntity.ok(new JwtAuthenticationResponse(refreshedToken));
        } else {
            return ResponseEntity.status(200).body(ErrorMessage.TOKEN_CANNOT_BE_REFRESHED_NOW);
        }
    }

    @RequestMapping(value = "/say/{name}", method = RequestMethod.GET)
    public ResponseEntity sayHello(@PathVariable String name) {
        return ResponseEntity.ok("Hello bitch" + name);
    }

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public ResponseEntity get() {
        List<User> users = userService.findAllUsers();
        return new ResponseEntity(users, HttpStatus.OK);
    }
}
