package com.userserver.mongo1;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface UserRepository extends MongoRepository<User, Integer>{

    User findById(String id);
    User findByUserEmail(String userEmail);

    void deleteById(String id);

}
