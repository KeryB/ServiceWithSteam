package com.process.platform.repository.team;


import com.process.platform.entity.SearchRequest;
import com.process.platform.entity.team.Team;

import java.util.List;

public interface CustomTeamRepository {

    List<Team> find(SearchRequest searchRequest);

    int count (SearchRequest searchRequest);
}
