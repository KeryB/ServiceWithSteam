package com.process.platform.controller;

import org.apache.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Кирилл on 03.04.2017.
 */
@RestController
@RequestMapping(value = "/user")
public class UserController {

    private static final Logger logger = Logger.getLogger(UserController.class);
    @RequestMapping(value = "/say/{name}",method = RequestMethod.GET)
    public ResponseEntity sayHello(@PathVariable String name){
        logger.info("asdasdasd");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        logger.info(authentication);
        return ResponseEntity.ok("Hello bitch" + name);
    }

}
