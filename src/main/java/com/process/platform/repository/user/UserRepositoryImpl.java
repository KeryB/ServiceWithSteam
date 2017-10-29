package com.process.platform.repository.user;

import com.process.platform.entity.SearchRequest;
import com.process.platform.entity.user.User;
import com.process.platform.utils.Jpa.JpaUtils;
import com.process.platform.utils.Jpa.QueryUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepositoryImpl implements CustomUserRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<User> find(SearchRequest searchRequest) {
        String query = "SELECT * FROM " + JpaUtils.USER_TABLE_NAME + QueryUtils.restRequestToPart(searchRequest);
        return jdbcTemplate.query(query, new BeanPropertyRowMapper<>(User.class));
    }

    @Override
    public int count(SearchRequest searchRequest) {
        String query = "SELECT count(*) AS count FROM " + JpaUtils.USER_TABLE_NAME + QueryUtils.checkOnFilter(searchRequest);
        return jdbcTemplate.query(query, (resultSet, i) -> resultSet.getInt("count")).get(0);
    }
}
