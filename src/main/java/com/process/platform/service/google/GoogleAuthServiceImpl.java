package com.process.platform.service.google;

import com.google.api.client.auth.openidconnect.IdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.process.platform.entity.user.User;
import com.process.platform.entity.user.UserRole;
import com.process.platform.service.impl.UserService;
import com.process.platform.utils.Jpa.JpaUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Date;

@Service
public class GoogleAuthServiceImpl implements GoogleAuthService {

    private final UserService userService;

    private final GoogleIdTokenVerifier verifier;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public GoogleAuthServiceImpl(UserService userService, @Value("${Google.clientId}") String clientId, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), JacksonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(clientId))
                .build();
    }

    @Override
    public User authenticateUserFromGoogle(String token) throws GeneralSecurityException, IOException {
        User user;
        GoogleIdToken idToken = verifier.verify(token);
        if(idToken!=null){
            Payload  payload = idToken.getPayload();
            String email= payload.getEmail();
            String googleId= payload.getSubject();
            user=userService.findByEmail(email);
            if(user==null){
                user = new User();
                user.setEmail(email);
                user.setCreation_date(new Date());
                user.setCaptain(false);
                user.setPassword(passwordEncoder.encode(RandomStringUtils.random(6, JpaUtils.CHARACTERS)));
                user.setFirst_name((String) payload.get("given_name"));
                user.setSecond_name((String) payload.get("family_name"));
                user.setRole(UserRole.NO_TEAM);
                user.setGoogleId(googleId);
                userService.saveUser(user);
            }else if(user.getGoogleId()==null){
                user.setGoogleId(googleId);
                userService.saveUser(user);
            }
        }else {
            throw  new GeneralSecurityException();
        }
        return user;
    }
}
