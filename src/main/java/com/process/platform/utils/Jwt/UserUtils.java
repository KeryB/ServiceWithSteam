package com.process.platform.utils.Jwt;


import com.process.platform.entity.user.User;

public class UserUtils {

    public static User setUpNewData(User user, PersonData personData){

        if(!personData.getFirst_name().isEmpty()) {
            user.setFirst_name(personData.getFirst_name());
        }
        if(!personData.getSecond_name().isEmpty()){
            user.setSecond_name(personData.getSecond_name());
        }
        if(!personData.getImage().isEmpty()){
            String base64 = personData.getImage().split(",")[1];
            byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64);
            user.setImage(imageBytes);
        }
        user.setNickname(personData.getNickname());
        user.setEmail(personData.getEmail());
        return user;
    }
}
