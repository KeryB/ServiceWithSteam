package com.process.platform.utils;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.process.platform.entity.RestResponse;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class HttpUtils {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static void sendError (HttpServletResponse response,int errorStatus,String errorMessage){
        if(response.isCommitted()){
            response.setStatus(200);
            response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
            try {
                String value = objectMapper.writeValueAsString(RestResponse.error(errorStatus,errorMessage));
                response.getWriter().write(value);
            } catch (IOException ignored) {
            }
        }
    }
}
