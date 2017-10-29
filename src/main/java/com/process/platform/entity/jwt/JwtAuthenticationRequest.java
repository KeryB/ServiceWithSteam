package com.process.platform.entity.jwt;

import com.process.platform.utils.errors.ErrorMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthenticationRequest {

    @NotNull(message = ErrorMessage.EMPTY_FIELD)
    private String email;
    @NotNull(message = ErrorMessage.EMPTY_FIELD)
    private String password;
}
