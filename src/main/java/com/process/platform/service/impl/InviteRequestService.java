package com.process.platform.service.impl;

import com.process.platform.entity.request.InviteRequest;
import com.process.platform.entity.team.Team;
import com.process.platform.repository.request.RequestRepository;
import com.process.platform.repository.team.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * Created by Кирилл on 31.03.2017.
 */
@Service
@Transactional
public class InviteRequestService {

    private final RequestRepository requestRepository;

    @Autowired
    public InviteRequestService(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    public void save(InviteRequest inviteRequest){
        requestRepository.save(inviteRequest);
    }
    public void delete(InviteRequest inviteRequest){
        requestRepository.delete(inviteRequest);
    }
}
