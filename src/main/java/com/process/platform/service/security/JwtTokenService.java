package com.process.platform.service.security;

import com.process.platform.entity.jwt.EmailToken;
import com.process.platform.entity.jwt.Token;
import com.process.platform.entity.user.User;
import com.process.platform.utils.Jwt.JwtTokenUtils;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtTokenService {

    private static final int emailExpiration=60*60*24;

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.header}")
    private String tokenHeader;

    @Value("${jwt.expiration}")
    private Long expiration;

    private Date generateExpirationDate() {
        return new Date(System.currentTimeMillis() + expiration * 1000);
    }

    private Date generateEmailExpirationDate() {
        return new Date(System.currentTimeMillis()+emailExpiration*1000);
    }

    public String generateToken(User user) {
        if (user == null)
            return null;
        Token token = new Token(user.getId(), user.getRole().name(), generateExpirationDate(), new Date());
        return JwtTokenUtils.convertClaims(token, secret);
    }

    public String generateEmailConfirmationToken(User user) {
        if (user == null)
            return null;
        return JwtTokenUtils.convertClaims(user.getEmail(),generateEmailExpirationDate(),new Date(),secret);
    }

    public Token getClaimsFromToken(String tokenHeader) {
        if (tokenHeader == null)
            return null;
        return JwtTokenUtils.unPackingData(tokenHeader, secret);
    }

    public EmailToken getClaimsFromEmailToken(String tokenHeader){
        if(tokenHeader==null)
            return null;
        return JwtTokenUtils.unPackingEmailData(tokenHeader,secret);
    }

    public boolean validateToken(Token token) {
        return validData(token) && !isTokenExpired(token.getExpiration());
    }

    private boolean isTokenExpired(Date expiration) {
        return expiration.before(new Date());
    }

    private boolean validData(Token token) {
        return !(token.getExpiration() == null || token.getCreationDate() == null);
    }


    public boolean canTokenBeRefreshed(Token token) {
        return validData(token) && isTokenExpired(token.getExpiration());
    }

}
