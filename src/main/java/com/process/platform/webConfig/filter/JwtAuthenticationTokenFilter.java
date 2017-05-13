package com.process.platform.webConfig.filter;

import com.process.platform.entity.jwt.JwtUser;
import com.process.platform.entity.jwt.Token;
import com.process.platform.entity.user.User;
import com.process.platform.service.impl.UserService;
import com.process.platform.service.security.JwtTokenService;
import com.process.platform.utils.Jwt.JwtWrapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by Кирилл on 01.04.2017.
 */
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenService jwtTokenService;
    @Autowired
    private UserService userService;

    @Value("${jwt.header}")
    private String tokenHeader;

    private static final Logger logger = Logger.getLogger(JwtAuthenticationTokenFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        logger.info(request.getRequestURI());
        logger.info(request.getRequestURI().startsWith("api"));
        logger.info(request.getRequestURI().startsWith("/api"));

        if (SecurityContextHolder.getContext().getAuthentication() == null
                && !request.getRequestURI().startsWith("/api")) {
            String auth = request.getHeader(tokenHeader);
            Token token = jwtTokenService.getClaimsFromToken(auth);
            logger.info(token);
            if (token!=null&&jwtTokenService.validateToken(token)) {
                User user = userService.findByEmail(token.getEmail());
                JwtUser jwtUser = JwtWrapper.wrapUser(user);
                UsernamePasswordAuthenticationToken authenticationToken
                        = new UsernamePasswordAuthenticationToken(jwtUser, null, jwtUser.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                logger.info("authenticated user " + user + ", setting security context");
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }else {

            }
        }
        filterChain.doFilter(request, response);
    }
}
