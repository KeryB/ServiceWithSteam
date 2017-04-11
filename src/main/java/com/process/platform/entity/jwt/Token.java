package com.process.platform.entity.jwt;

import com.process.platform.entity.user.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

/**
 * Created by Кирилл on 01.04.2017.
 */
@Data
@AllArgsConstructor
public class Token {
    private String email;
    private String role;
    private Date expiration;
    private Date creationDate;
}
