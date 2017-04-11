package com.process.platform.controller.restController;

import com.process.platform.entity.jwt.JwtAuthenticationRequest;
import com.process.platform.entity.jwt.Token;
import com.process.platform.entity.user.User;
import com.process.platform.entity.user.UserRole;
import com.process.platform.service.impl.UserService;
import com.process.platform.service.security.JwtAuthenticationResponse;
import com.process.platform.service.security.JwtTokenService;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping(value = "/auth")
public class AuthenticationRestController {

    private static final Logger logger = Logger.getLogger(AuthenticationRestController.class);

    @Value("${jwt.header}")
    private String tokenHeader;

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;

    @Autowired
    public AuthenticationRestController(UserService userService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtTokenService jwtTokenService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtTokenService = jwtTokenService;
    }

    @RequestMapping(value = "/createAuthToken", method = RequestMethod.POST)
    public ResponseEntity createAuthToken(@Valid @RequestBody JwtAuthenticationRequest jwtAuthenticationRequest) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                = new UsernamePasswordAuthenticationToken(
                jwtAuthenticationRequest.getEmail(),
                jwtAuthenticationRequest.getPassword()
        );
        final Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        logger.info(authentication);
        User user = userService.findByEmail(jwtAuthenticationRequest.getEmail());
        String token = jwtTokenService.generateToken(user);
        logger.info(token);
        return ResponseEntity.ok(new JwtAuthenticationResponse(token));
    }

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public ResponseEntity registerUser(@Valid @RequestBody User user) {
        if (userService.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(ErrorStatus.EMAIL_NOT_UNIQUE).body(ErrorMessage.EMAIL_NOT_UNIQUE);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreation_date(new Date());
        user.setRole(UserRole.NO_TEAM);
        user.setCaptain(false);
        userService.saveUser(user);
        String token = jwtTokenService.generateToken(user);
        logger.info(token);
        logger.info(user);
        return ResponseEntity.ok(new JwtAuthenticationResponse(token));
    }

    @RequestMapping(value = "/confirm_registration",method = RequestMethod.GET)
    public ResponseEntity confirmRegistration(){
        return null;
    }

    @RequestMapping(value ="/google_auth",method = RequestMethod.POST)
    public ResponseEntity googleAuth(@RequestBody JwtAuthenticationResponse jwtAuthenticationResponse){
        return null;
    }

    @RequestMapping(value = "refresh_token", method = RequestMethod.GET)
    public ResponseEntity refreshToken(HttpServletRequest request) {
        String header = request.getHeader(tokenHeader);
        Token token = null;
        token = jwtTokenService.getClaimsFromToken(header);
        if(token == null)
            return ResponseEntity.status(ErrorStatus.INVALID_TOKEN_HEADER).body(ErrorMessage.INVALID_TOKEN_HEADER);
        User user = userService.findByEmail(token.getEmail());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("UNAUTHORIZED");
        }
        if (jwtTokenService.canTokenBeRefreshed(token)) {
            String refreshedToken = jwtTokenService.generateToken(user);
            return ResponseEntity.ok(new JwtAuthenticationResponse(refreshedToken));
        } else {
            return ResponseEntity.status(ErrorStatus.TOKEN_CANNOT_BE_REFRESHED_NOW).body(ErrorMessage.TOKEN_CANNOT_BE_REFRESHED_NOW);
        }
    }



    @RequestMapping(value = "/say/{name}", method = RequestMethod.GET)
    public ResponseEntity sayHello(@PathVariable String name) {
        return ResponseEntity.ok("Hello bitch" + name);
    }
}
