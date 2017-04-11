package com.process.platform.entity.request;

import com.process.platform.utils.Jpa.JpaUtils;
import com.process.platform.entity.team.Team;
import com.process.platform.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = JpaUtils.INVITE_REQUEST_TABLE_NAME)
public class InviteRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name =JpaUtils.USER_PRIMARY_KEY)
    private User target;

    @ManyToOne
    @JoinColumn(name = JpaUtils.TEAM_PRIMARY_KEY)
    private Team source;

    private Date creation_date_invite;

    private Status status;
}
