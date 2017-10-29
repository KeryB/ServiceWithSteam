package com.process.platform.controller.serviceController;

import com.process.platform.entity.RestResponse;
import com.process.platform.entity.request.InviteRequest;
import com.process.platform.entity.team.Team;
import com.process.platform.entity.user.User;
import com.process.platform.service.impl.RequestService;
import com.process.platform.service.impl.TeamService;
import com.process.platform.service.impl.UserService;
import javafx.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/request")
public class RequestController {

    private final RequestService requestService;

    private final UserService userService;

    private final TeamService teamService;

    @Autowired
    public RequestController(RequestService requestService, UserService userService, TeamService teamService) {
        this.requestService = requestService;
        this.userService = userService;
        this.teamService = teamService;
    }

    @RequestMapping(value = "/invite/{targetId}", method = RequestMethod.GET)
    public RestResponse newInviteRequest(@RequestBody User source, @PathVariable("targetId") long targetId) {
        User target = userService.findById(targetId);
        Pair<Integer, String> errors = requestService.checkForNewRequestAvailable(target, source);
        if (errors != null) {
            return RestResponse.error(errors.getKey(),errors.getValue());
        }
        return RestResponse.ok(requestService.newInviteRequest(target,source));
    }

    @RequestMapping(value = "/accept/invite/{id}", method = RequestMethod.GET)
    public RestResponse acceptInviteRequest(@PathVariable("id") long id,@RequestBody User target){
        InviteRequest inviteRequest = requestService.findOne(id);
        Pair<Integer, String> errors = requestService.checkForInviteAvailable(target, inviteRequest);
        if(errors!=null){
            RestResponse.error(errors.getKey(),errors.getValue());
        }
        User user = requestService.acceptInviteRequest(target, inviteRequest);
        return RestResponse.ok(user);
    }

    @RequestMapping(value = "/reject/invite/{id}",method = RequestMethod.GET)
        public RestResponse rejectInvite(@PathVariable("id") long id,@RequestBody User target){
        InviteRequest inviteRequest = requestService.findOne(id);
        Pair<Integer, String> errors = requestService.checkForInviteAvailable(target, inviteRequest);
        if(errors!=null){
            return RestResponse.error(errors.getKey(),errors.getValue());
        }
        requestService.rejectInviteRequest(inviteRequest);
        return null;
    }


}
