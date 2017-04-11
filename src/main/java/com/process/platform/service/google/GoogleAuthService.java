package com.process.platform.service.google;

import com.process.platform.entity.user.User;

/**
 * Created by Кирилл on 10.04.2017.
 */
public interface GoogleAuthService {
    User authenticateUserFromGoogle(String token);
}
