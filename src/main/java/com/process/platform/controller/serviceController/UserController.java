package com.process.platform.controller.serviceController;

import com.process.platform.entity.RestResponse;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sun.misc.BASE64Decoder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotNull;


@RestController
@RequestMapping(value = "/api/user")
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
            return RestResponse.ok(
                    new PersonData(user.getEmail(), user.getRole().name(),
                            user.getFirst_name(), user.getSecond_name(), user.getNickname(),
                            user.isCaptain(), true,null));
        }
        return RestResponse.ok(
                new PersonData(user.getEmail(), user.getRole().name(),
                        user.getFirst_name(), user.getSecond_name(), user.getNickname(),
                        user.isCaptain(), false,null));
    }

    @RequestMapping(value = "/updateUserData",method = RequestMethod.POST)
    public RestResponse updateUserData(HttpServletRequest request,@RequestBody PersonData personData){
        Token token = jwtTokenService.getClaimsFromToken(request.getHeader(tokenHeader));
        if (token == null) {
            return RestResponse.error(ErrorStatus.INVALID_TOKEN_HEADER, ErrorMessage.INVALID_TOKEN_HEADER);
        }
        User user = userService.findById(token.getId());
        user = UserUtils.setUpNewData(user,personData);
        String base64 = personData.getImage().split(",")[1];
        byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64);


        return RestResponse.ok(personData);
    }

}
