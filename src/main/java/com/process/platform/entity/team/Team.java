package com.process.platform.entity.team;

import com.process.platform.utils.Jpa.JpaUtils;
import com.process.platform.entity.request.InviteRequest;
import com.process.platform.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = JpaUtils.TEAM_TABLE_NAME)
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Size(min = 3,max = 64)
    @Pattern(regexp = "([А-аЯ-я]|[A-aZ-z]|\\d)+")
    private String team_name;

    private Date creation_date;

/*    @OneToMany(cascade = CascadeType.ALL,mappedBy = "primaryTeam")
    private List<User> userList;
*/

}
