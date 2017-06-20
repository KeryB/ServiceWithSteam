package com.process.platform.repository.request;

import com.process.platform.entity.request.InviteRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepository extends JpaRepository<InviteRequest,Long> {
}
