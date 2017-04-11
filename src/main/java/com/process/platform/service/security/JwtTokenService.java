package com.process.platform.service.security;

import com.process.platform.entity.jwt.Token;
import com.process.platform.entity.user.User;
import com.process.platform.service.impl.UserService;
import com.process.platform.utils.Jwt.JwtTokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtTokenService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.header}")
    private String tokenHeader;

    @Value("${jwt.expiration}")
    private Long expiration;

    private Date generateExpirationDate(){
        return new Date(System.currentTimeMillis()+expiration*1000);
    }

    public String generateToken(User user) {
        if(user==null)
            return null;
        Token token = new Token(user.getEmail(),user.getRole().name(),generateExpirationDate(),new Date());
        return JwtTokenUtils.convertClaims(token,secret);
    }

    public Token getClaimsFromToken(String tokenHeader){
        if(tokenHeader==null)
            return null;
        return JwtTokenUtils.unPackingData(tokenHeader,secret);
    }


    public boolean validateToken(Token token) {
        return validData(token)&&!isTokenExpired(token.getExpiration());
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
