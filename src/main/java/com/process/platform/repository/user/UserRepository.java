package com.process.platform.repository.user;

import com.process.platform.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Кирилл on 31.03.2017.
 */
public interface UserRepository extends JpaRepository<User,Long> {
    User findByEmail(String email);
}
