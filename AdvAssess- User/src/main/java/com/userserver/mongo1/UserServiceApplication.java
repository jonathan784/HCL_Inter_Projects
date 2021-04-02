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

	public static void main(String[] args) {
		SpringApplication.run(UserServiceApplication.class, args);

	}

}
