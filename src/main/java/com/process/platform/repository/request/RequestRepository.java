package com.process.platform.repository.request;

import com.process.platform.entity.request.InviteRequest;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Кирилл on 31.03.2017.
 */
public interface RequestRepository extends JpaRepository<InviteRequest,Long> {
}
