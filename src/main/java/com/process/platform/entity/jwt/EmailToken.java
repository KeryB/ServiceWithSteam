package com.process.platform.entity.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class EmailToken {
    private String email;
    private Date creationDate;
    private Date expiration;
}
