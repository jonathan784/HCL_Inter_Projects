/*
File Name: AuthService.java
Purpose: This file creates the auth service class and includes all of its methods
Date: 4/15/2021
Group Developer Name: Adv-Access Interns Spring 2021
*/


package com.userserver.mongo1;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.logging.Level;
import java.util.logging.Logger;


@Service
public class AuthService {

    @Autowired
    UserRepository repository;
    NullPointerException nullPointerException;

    public String authenticateUser(User user){
        String returnValue = "false";
        Logger logger = Logger.getLogger(SaveUserService.class.getName());
        try {
            //retrieve userEmail from the user which was passed from the login
            String userEmail = user.getUserEmail();
            //retrieve userPassword from the user which was passed from the login
            String userPassword = user.getUserPassword();


            //check to see if either is null (aka, bad login)
            if(userEmail == null || userPassword == null)
            {
                throw nullPointerException;
            }
            else {
                //pull user from database
                User userFromDatabase = repository.findByUserEmail(userEmail);

                if(!userEmail.contains(userFromDatabase.getUserEmail()) || !userPassword.contains(userFromDatabase.getUserPassword()))
                {
                    logger.log(Level.SEVERE, "Invalid Login");                }
                else
                    returnValue = "true";

            }

            //catches exception for either wrong email or wrong password
        } catch (Exception e) {
            logger.log(Level.SEVERE, String.valueOf(e));
        }
        return returnValue;


    }
}

