/*
File Name: SaveUserService.java
Purpose: This file creates the save user service class and includes all of its methods
Date: 4/15/2021
Group Developer Name: Adv-Access Interns Spring 2021
*/

package com.userserver.mongo1;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.logging.Level;
import java.util.logging.Logger;


@Service

public class SaveUserService {

    @Autowired
    UserRepository repository;

    Logger logger = Logger.getLogger(SaveUserService.class.getName());

    public void saveUser(User user){

        try {
            //retrieve userEmail from the user which was passed from the login
            String userEmail = user.getUserEmail();

            //retrieve userPassword from the user which was passed from the login
            String userPassword = user.getUserPassword();

            //pull user from database
            User userFromDatabase = repository.findByUserEmail(userEmail);
            if(userFromDatabase == null)
            {
                repository.save(user);
            }
            else
            {
                logger.log(Level.SEVERE, "User already in database");
            }

            //catches exception for either wrong email or wrong password
        } catch (Exception e) {
            logger.log(Level.SEVERE, String.valueOf(e));
        }
    }
}
