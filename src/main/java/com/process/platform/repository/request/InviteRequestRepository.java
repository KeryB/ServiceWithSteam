package com.process.platform.repository.request;

import com.process.platform.entity.request.InviteRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface InviteRequestRepository extends JpaRepository<InviteRequest,Long> {

    @Query("select req from InviteRequest req where req.target.id=:userId")
    List<InviteRequest> findActualInviteRequestByUserId(@Param("userId") long userId);

    @Query("select req from InviteRequest req where req.source.id=:teamId and req.status=2")
    List<InviteRequest> findInviteRequestByTeamId(@Param("teamId") long teamId);

}
