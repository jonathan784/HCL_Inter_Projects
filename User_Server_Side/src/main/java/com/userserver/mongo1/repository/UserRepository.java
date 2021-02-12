package com.userserver.mongo1.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.userserver.mongo1.model.User;

public interface UserRepository extends MongoRepository<User, Integer>{

}
