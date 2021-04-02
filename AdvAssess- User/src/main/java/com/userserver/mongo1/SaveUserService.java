package com.userserver.mongo1;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.InstanceAlreadyExistsException;
import java.util.List;

@Service

public class SaveUserService {

    @Autowired
    UserRepository repository;
    UserInDatabaseException userInDatabaseException;


    public void saveUser(User user){
        try {
            //retrieve userEmail from the user which was passed from the login
            String userEmail = user.getUserEmail();
            System.out.println(userEmail);
            //retrieve userPassword from the user which was passed from the login
            String userPassword = user.getUserPassword();
            System.out.println(userPassword);

            //pull user from database
            User userFromDatabase = repository.findByUserEmail(userEmail);
            if(userFromDatabase == null)
            {
                repository.save(user);
            }
            else
            {
                throw (Throwable) userInDatabaseException;
            }

            //catches exception for either wrong email or wrong password
        } catch (Throwable throwable) {
            System.out.println("User already in database");
        }
    }
}
