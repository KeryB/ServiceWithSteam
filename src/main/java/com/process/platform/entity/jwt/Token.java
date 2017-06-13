package com.process.platform.entity.jwt;

import com.process.platform.entity.user.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class Token {
    private Long id;
    private String role;
    private Date expiration;
    private Date creationDate;
}
