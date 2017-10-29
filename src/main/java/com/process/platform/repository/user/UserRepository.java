package com.process.platform.repository.user;

import com.process.platform.entity.user.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.stream.Stream;

public interface UserRepository extends JpaRepository<User,Long>,CustomUserRepository {
    User findByEmail(String email);

    @Query("select u from User u where u.primaryTeam.id =:teamId")
    Stream<User> findMembersOfTeam(@Param("teamId") long teamId);
}
