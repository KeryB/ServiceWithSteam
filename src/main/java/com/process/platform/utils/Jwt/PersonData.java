package com.process.platform.utils.Jwt;


import com.process.platform.entity.user.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PersonData {
    private String email;
    private String role;
    private String first_name;
    private String second_name;
    private String nickname;
    private Boolean isTokenExpired;
}
