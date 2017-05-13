package com.process.platform.service.impl;

import com.process.platform.entity.user.User;
import com.process.platform.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Stream;

/**
 * Created by Кирилл on 31.03.2017.
 */
@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findById(long id) {
        return userRepository.findOne(id);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    public boolean countMemberOfTeamId(long teamId) {
        Stream<User> stream = userRepository.findMembersOfTeam(teamId);
        return stream.count() == 0;
    }
}
