package com.process.platform.service.security;

import com.process.platform.entity.jwt.JwtUser;
import com.process.platform.entity.user.User;
import com.process.platform.repository.user.UserRepository;
import com.process.platform.utils.Jwt.JwtWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public JwtUserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);

        if (user == null) {
            throw new UsernameNotFoundException("User '" + username + "' not found");
        }
        return JwtWrapper.wrapUser(user);
    }
}
