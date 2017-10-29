package com.process.platform.controller.serviceController;

import com.process.platform.entity.RestResponse;
import com.process.platform.entity.SearchRequest;
import com.process.platform.entity.jwt.Token;
import com.process.platform.entity.user.User;
import com.process.platform.service.impl.UserService;
import com.process.platform.service.security.JwtTokenService;
import com.process.platform.utils.Jwt.PersonData;
import com.process.platform.utils.Jwt.UserUtils;
import com.process.platform.utils.errors.ErrorMessage;
import com.process.platform.utils.errors.ErrorStatus;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import sun.misc.BASE64Decoder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotNull;


@RestController
@RequestMapping(value = "/api/user",consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class UserController {

    private static final Logger logger = Logger.getLogger(UserController.class);

    private final UserService userService;

    private final JwtTokenService jwtTokenService;

    @Value("${jwt.header}")
    private String tokenHeader;

    @Autowired
    public UserController(UserService userService, JwtTokenService jwtTokenService) {
        this.userService = userService;
        this.jwtTokenService = jwtTokenService;
    }

    @RequestMapping(value = "/getData", method = RequestMethod.POST)
    public RestResponse getData(HttpServletRequest request) {
        Token token = jwtTokenService.getClaimsFromToken(request.getHeader(tokenHeader));
        if (token == null) {
            return RestResponse.error(ErrorStatus.INVALID_TOKEN_HEADER, ErrorMessage.INVALID_TOKEN_HEADER);
        }
        User user = userService.findById(token.getId());
        if (jwtTokenService.canTokenBeRefreshed(token)) {
            return RestResponse.ok(new RestResponse<>(null));
        }
        return RestResponse.ok(user);
    }

    @RequestMapping(value = "/updateUserData",method = RequestMethod.POST)
    public RestResponse updateUserData(HttpServletRequest request,@RequestBody User user){
        Token token = jwtTokenService.getClaimsFromToken(request.getHeader(tokenHeader));
        if (token == null) {
            return RestResponse.error(ErrorStatus.INVALID_TOKEN_HEADER, ErrorMessage.INVALID_TOKEN_HEADER);
        }
//        User user = userService.findById(token.getId());
//        user = UserUtils.setUpNewData(user,personData);
        return RestResponse.ok(null);
    }

    @RequestMapping(value = "/findUsers",method = RequestMethod.POST)
    public RestResponse findUsers(@RequestBody SearchRequest searchRequest){
        return RestResponse.ok(userService.findUsers(searchRequest));
    }

    @RequestMapping(
            value = "/findUsers",
            params = { "q" },
            method = RequestMethod.GET)
    public RestResponse findUsers( @RequestParam("q") String search){
        return RestResponse.ok(true);
    }

    @RequestMapping(value = "/findById/{id}",method = RequestMethod.GET)
    public RestResponse findById(@PathVariable long id){
        return RestResponse.ok(userService.findById(id));
    }

}
