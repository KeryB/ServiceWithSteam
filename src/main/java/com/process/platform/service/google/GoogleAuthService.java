package com.process.platform.service.google;

import com.process.platform.entity.user.User;

import java.io.IOException;
import java.security.GeneralSecurityException;

public interface GoogleAuthService {
    User authenticateUserFromGoogle(String token) throws GeneralSecurityException, IOException;
}
