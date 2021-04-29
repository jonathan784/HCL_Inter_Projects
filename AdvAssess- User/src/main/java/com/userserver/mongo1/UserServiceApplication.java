/*
File Name: UserServiceApplication.java
Purpose: This file runs this application
Date: 4/15/2021
Group Developer Name: Adv-Access Interns Spring 2021
*/


package com.userserver.mongo1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;


@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class UserServiceApplication
{

	@Autowired
	public UserRepository theRepository;

	//runs this program
	public static void main(String[] args) {
		SpringApplication.run(UserServiceApplication.class, args);

	}

}
