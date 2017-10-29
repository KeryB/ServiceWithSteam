package com.process.platform.repository.user;

import com.process.platform.entity.SearchRequest;
import com.process.platform.entity.user.User;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface CustomUserRepository {

    List<User> find(SearchRequest searchRequest);

    int count(SearchRequest searchRequest);
}
