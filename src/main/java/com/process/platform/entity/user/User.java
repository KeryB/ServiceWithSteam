package com.process.platform.entity.user;

import com.process.platform.utils.Jpa.JpaUtils;
import com.process.platform.entity.request.InviteRequest;
import com.process.platform.entity.team.Team;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = JpaUtils.USER_TABLE_NAME)
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Size(min = 4, max = 64)
    @Pattern(regexp = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")
    private String email;

    @Size(min=5,max=100)
    @Pattern(regexp = "(\\w|\\D)+")
    private String password;

    @DateTimeFormat(pattern = "MM/dd/yyyy")
    private Date creation_date;

    @Size(min = 3,max = 64)
    @Pattern(regexp = "([А-аЯ-я]|[A-aZ-z]|\\d)+")
    private String first_name;

    @Size(min = 3,max = 64)
    @Pattern(regexp = "([А-аЯ-я]|[A-aZ-z]|\\d)+")
    private String second_name;

    @Size(min = 3,max = 64)
    @Pattern(regexp = "([А-аЯ-я]|[A-aZ-z]|\\d)+")
    private String nickname;

    private UserRole role;

    @ManyToOne
    @JoinColumn(name = JpaUtils.TEAM_PRIMARY_KEY)
    private Team primaryTeam;

    private boolean captain;

    private  String googleId;

    @Lob
    private byte[] image;

}
