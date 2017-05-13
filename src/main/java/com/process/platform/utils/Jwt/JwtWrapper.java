package com.process.platform.utils.Jwt;

import com.process.platform.entity.jwt.JwtUser;
import com.process.platform.entity.user.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

public class JwtWrapper {
    public static JwtUser wrapUser(User user) {
        JwtUser jwtUser = new JwtUser();
        jwtUser.setPassword(user.getPassword());
        jwtUser.setLogin(user.getEmail());
        jwtUser.setAuthorities(createAuthorities(user.getRole().name()));
        jwtUser.setEnabled(true);
        return jwtUser;
    }

    private static Collection<? extends GrantedAuthority> createAuthorities(String role) {
        Set<GrantedAuthority> grantedAuthority = new HashSet<>();
            grantedAuthority.add(new SimpleGrantedAuthority(role));
            return grantedAuthority;
    }
}
