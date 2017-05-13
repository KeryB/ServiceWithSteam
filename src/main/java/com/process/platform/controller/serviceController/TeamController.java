package com.process.platform.controller.serviceController;

import com.process.platform.entity.team.Team;
import com.process.platform.entity.user.User;
import com.process.platform.entity.user.UserRole;
import com.process.platform.service.impl.TeamService;
import com.process.platform.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping(value = "/team")
public class TeamController {
    private final TeamService teamService;
    private final UserService userService;

    @Autowired
    public TeamController(TeamService teamService, UserService userService) {
        this.teamService = teamService;
        this.userService = userService;
    }

    @RequestMapping(value = "/find")
    public ResponseEntity findTeam(){
        return null;
    }

    @RequestMapping(value = "/delete",method = RequestMethod.POST)
    public ResponseEntity deleteTeam(@RequestBody Team team){
        if(userService.countMemberOfTeamId(team.getId())){
            teamService.delete(team);
        }
        return ResponseEntity.ok(true);
    }
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<Team> save(@RequestBody Team team) {
    return ResponseEntity.ok(teamService.save(team));
    }

    @RequestMapping(value = "/leave_team",method = RequestMethod.POST)
    public ResponseEntity leaveFromTeam(@RequestBody User user,@RequestBody User targetUser){
        if(user.isCaptain()){
            targetUser.setCaptain(true);
            return ResponseEntity.ok(userService.saveUser(user));
        }
        user.setRole(UserRole.NO_TEAM);
        user.setPrimaryTeam(null);
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @RequestMapping(value = "/create_team", method = RequestMethod.POST)
    public ResponseEntity createTeam(@RequestBody Team team, @RequestBody User user) {
        user.setCaptain(true);
        user.setRole(UserRole.MEMBER);
        user.setPrimaryTeam(team);
        team.setCreation_date(new Date());
        userService.saveUser(user);
        teamService.save(team);
        return ResponseEntity.ok(true);
    }
}
