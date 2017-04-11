package com.process.platform.service.impl;

import com.process.platform.entity.team.Team;
import com.process.platform.repository.team.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * Created by Кирилл on 31.03.2017.
 */
@Service
@Transactional
public class TeamService {

    private final TeamRepository teamRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public void save(Team team){
        teamRepository.save(team);
    }
    public void delete(Team team){
        teamRepository.delete(team);
    }
}
