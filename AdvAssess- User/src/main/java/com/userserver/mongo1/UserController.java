/*
File Name: UserController.java
Purpose: This file acts as the API for this application, including methods which allow for manipulation of the database which this
	application links to.
Date: 4/15/2021
Group Developer Name: Adv-Access Interns Spring 2021
*/


package com.userserver.mongo1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

	@Autowired
	UserRepository repository;

	@Autowired
	AuthService authService;

	@Autowired
	SaveUserService saveUserService;

	//Purpose: This function receives a user object and saves the user in the database
	@PostMapping("/Users")
	public void saveUser(@RequestBody User user) {

		//creating a persistent assessment
		User persistentUser = new User();

		//map passed object to this persistent object
		persistentUser = user;
		saveUserService.saveUser(persistentUser);
	}

	//Purpose: This function receives a user object and calls the authentication service
	@PostMapping(value = "/authentication", produces="text/plain")
	public String authenticateUser(@RequestBody User user)
	{
		//creating a persistent assessment
		User persistentUser = new User();

		//map passed object to this persistent object
		persistentUser = user;
		//returns a true/false to indicate whether the useremail/password were successfully authenticated in database
		return authService.authenticateUser(persistentUser);
	}

	@GetMapping("/Users")
	public List<User> getUsers() {
		return repository.findAll();
	}

	@PostMapping("/returnByEmail")
	public User getUsers(@RequestBody User user) {

		//creating a persistent assessment
		User persistentUser = new User();

		//map passed object to this persistent object
		persistentUser = user;

		String userEmail = persistentUser.getUserEmail();
		return repository.findByUserEmail(userEmail);
	}

	@DeleteMapping("/Users/{id}")
	public String deleteUser(@PathVariable String id) {
		String persistentID = id;

		repository.deleteById(persistentID);
		return "user deleted with id : " + id;
	}

	//Deletes all users
	@DeleteMapping("/Users")
	public String deleteAllUsers() {
		repository.deleteAll();
		return "All users delete.";
	}


	@GetMapping(value = "/getAccountNames/{userEmail}", produces = {"application/json"})
	public String[] getAssessmentsByAccount(@PathVariable String userEmail) {

		String persistentUserEmail = userEmail;
		User currentUser = repository.findByUserEmail(persistentUserEmail);
		return currentUser.getAccountNames(); 

	}

}
