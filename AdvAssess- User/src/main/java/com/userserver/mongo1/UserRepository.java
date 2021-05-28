package com.userserver.mongo1;

import org.springframework.data.mongodb.repository.MongoRepository;



public interface UserRepository extends MongoRepository<User, Integer>{

    User findByUserEmail(String userEmail);
    void deleteById(String id);

}
