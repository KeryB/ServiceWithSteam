package com.process.platform.utils.Jwt;

import com.process.platform.entity.jwt.EmailToken;
import com.process.platform.entity.jwt.Token;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Кирилл on 02.04.2017.
 */
public class JwtTokenUtils {

    private static final String CLAIM_KEY_USERNAME = "sub";
    private static final String CLAIM_KEY_ROLE = "role";
    private static final String CLAIM_KEY_CREATION_DATE = "cr";



    public static String convertClaims(Token token, String secret) {
        Map<String,Object> claims = new HashMap<>();
        claims.put(CLAIM_KEY_USERNAME,token.getEmail());
        claims.put(CLAIM_KEY_ROLE,token.getRole());
        claims.put(CLAIM_KEY_CREATION_DATE,token.getCreationDate());
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(token.getExpiration())
                .signWith(SignatureAlgorithm.HS512,secret)
                .compact();
    }
    public static String convertClaims(String email, Date expirationDate,Date creationDate,String secret) {
        Map<String,Object> claims = new HashMap<>();
        claims.put(CLAIM_KEY_USERNAME,email);
        claims.put(CLAIM_KEY_CREATION_DATE,creationDate);
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512,secret)
                .compact();
    }

    public static Token unPackingData(String token,String secret) {
        Claims claims = null;
        try {
            claims=Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();
        }catch (ExpiredJwtException e){
            claims=e.getClaims();
            String email = (String) claims.get(CLAIM_KEY_USERNAME);
            String role = (String) claims.get(CLAIM_KEY_ROLE);
            Date creationDate = new Date((Long) claims.get(CLAIM_KEY_CREATION_DATE));
            return new Token(email,role,claims.getExpiration(),creationDate);
        }catch (Exception e){
            return null;
        }
        String email = (String) (claims != null ? claims.get(CLAIM_KEY_USERNAME) : null);
        String role = (String) (claims != null ? claims.get(CLAIM_KEY_ROLE) : null);
        Date creationDate = new Date((Long) claims.get(CLAIM_KEY_CREATION_DATE));
        return new Token(email,role,claims.getExpiration(),creationDate);
    }

    public static EmailToken unPackingEmailData(String token, String secret) {
        Claims claims;
        try {
            claims = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            return null;
        }
        String email = (String) (claims != null ? claims.get(CLAIM_KEY_USERNAME) : null);
        Date creationDate = new Date((Long) claims.get(CLAIM_KEY_CREATION_DATE));
        return new EmailToken(email, creationDate, claims.getExpiration());
    }
}
