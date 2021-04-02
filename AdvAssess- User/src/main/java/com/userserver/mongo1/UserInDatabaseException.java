package com.userserver.mongo1;

public class UserInDatabaseException extends Exception{
    public UserInDatabaseException(String errorMessage){
        super(errorMessage);
    }
}


