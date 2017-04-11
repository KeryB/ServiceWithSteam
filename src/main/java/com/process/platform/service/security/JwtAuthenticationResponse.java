package com.process.platform.service.security;

/**
 * Created by Кирилл on 02.04.2017.
 */
public class JwtAuthenticationResponse {
    private String token;

    public JwtAuthenticationResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return this.token;
    }
}
