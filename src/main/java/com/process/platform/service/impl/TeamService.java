package com.process.platform.service.impl;

import com.process.platform.entity.team.Team;
import com.process.platform.repository.team.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class TeamService {

    private final TeamRepository teamRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public Team save(Team team){
        return teamRepository.save(team);
    }
    public Team findOne(long id){
        return teamRepository.findOne(id);
    }
    public void delete(Team team){
        teamRepository.delete(team);
    }
}
