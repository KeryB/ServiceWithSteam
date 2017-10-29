package com.process.platform.service.impl;

import com.process.platform.entity.request.InviteRequest;
import com.process.platform.entity.request.Status;
import com.process.platform.entity.team.Team;
import com.process.platform.entity.user.User;
import com.process.platform.entity.user.UserRole;
import com.process.platform.repository.request.InviteRequestRepository;
import com.process.platform.utils.errors.ErrorMessage;
import javafx.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
public class RequestService {

    @Value("${Request.max.team}")
    private int MAX_REQUEST_FOR_TEAM;

    private final InviteRequestRepository inviteRequestRepository;

    private final UserService userService;

    @Autowired
    public RequestService(InviteRequestRepository inviteRequest, UserService userService) {
        this.inviteRequestRepository = inviteRequest;
        this.userService = userService;
    }

    public InviteRequest getInviteRequestById(long id) {
        return inviteRequestRepository.findOne(id);
    }

    public InviteRequest newInviteRequest(User target, User source) {
        InviteRequest inviteRequest = new InviteRequest();
        inviteRequest.setCreation_date_invite(new Date());
        inviteRequest.setSource(source.getPrimaryTeam());
        inviteRequest.setStatus(Status.NOT_CONSIDERED);
        inviteRequest.setTarget(target);
        inviteRequestRepository.save(inviteRequest);
        return inviteRequest;
    }

    public Pair<Integer, String> checkForNewRequestAvailable(User target, User source) {
        if (!source.isCaptain() || source.getPrimaryTeam() == null)
            return new Pair<>(HttpServletResponse.SC_FORBIDDEN, ErrorMessage.NO_PRIVILEGES);
        if (target == null) {
            return new Pair<>(404, "User Not Found");
        }
        List<InviteRequest> activeRequests =
                inviteRequestRepository.findInviteRequestByTeamId(source.getPrimaryTeam().getId());

        if (activeRequests.size() > MAX_REQUEST_FOR_TEAM) {
            return new Pair<>(406, "Max team request: " + MAX_REQUEST_FOR_TEAM);
        }
        boolean match = activeRequests.stream()
                .anyMatch(request -> request.getTarget().getEmail().equals(target.getEmail()));

        if (match) {
            return new Pair<>(400, "Request for this user already exist");
        }
        return null;
    }

    public Pair<Integer, String> checkForInviteAvailable(User target, InviteRequest request) {
        if (target == null) {
            return new Pair<>(404, "User Not Found");
        }
        if(request.getStatus()!=Status.NOT_CONSIDERED){
            return new Pair<>(400,"Request has already been rejected or resolved");
        }
        if(request.getSource()==null){
            return new Pair<>(404, "Team Not Found");
        }
        if (target.getPrimaryTeam() != null) {
            return new Pair<>(400, "User already has team");
        }
        if (!request.getTarget().getEmail().equals(target.getEmail())) {
            return new Pair<>(400, "User cant accept foreign request");
        }
        return null;
    }


    public User acceptInviteRequest(User target, InviteRequest inviteRequest) {
        target.setPrimaryTeam(inviteRequest.getSource());
        target.setRole(UserRole.MEMBER);
        inviteRequest.setStatus(Status.ACCEPTED);
        userService.saveUser(target);
        inviteRequestRepository.save(inviteRequest);
        return inviteRequest.getTarget();
    }

    public void rejectAllActualRequest(long userId) {
        List<InviteRequest> actualInviteRequests =
                inviteRequestRepository.findActualInviteRequestByUserId(userId);
        List<InviteRequest> rejectedListOfRequests = actualInviteRequests.stream().
                filter(req -> req.getStatus() == Status.NOT_CONSIDERED)
                .map(req -> {
                    req.setStatus(Status.REJECTED);
                    return req;
                })
                .collect(Collectors.toList());
        inviteRequestRepository.save(rejectedListOfRequests);
    }


    public void rejectInviteRequest(InviteRequest inviteRequest) {
        inviteRequest.setStatus(Status.REJECTED);
        inviteRequestRepository.save(inviteRequest);
    }

    public InviteRequest findOne(long id){
        return inviteRequestRepository.findOne(id);
    }
}
