package com.userserver.mongo1;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    @Autowired
    UserRepository repository;
    InvalidLoginException invalidLoginException;
    NullPointerException nullPointerException;

    public String authenticateUser(User user){
        String returnValue = "false";
        try {
            //retrieve userEmail from the user which was passed from the login
            String userEmail = user.getUserEmail();
            //retrieve userPassword from the user which was passed from the login
            String userPassword = user.getUserPassword();
            System.out.println("userEmail:" + userEmail);
            System.out.println("userPassword:" + userPassword);

            //check to see if either is null (aka, bad login)
            if(userEmail == null || userPassword == null)
            {
                throw nullPointerException;
            }
            else {
                //pull user from database
                User userFromDatabase = repository.findByUserEmail(userEmail);
                System.out.println(userFromDatabase);

                if(!userEmail.contains(userFromDatabase.getUserEmail()) || !userPassword.contains(userFromDatabase.getUserPassword()))
                {
                    throw (Throwable) invalidLoginException;
                }
                else
                    returnValue = "true";

            }

            //catches exception for either wrong email or wrong password
        } catch (Throwable throwable) {
            System.out.println("Invalid login");
        }
        System.out.println("returnValue: "+ returnValue);
        return returnValue;


    }
}

