package com.userserver.mongo1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import java.util.function.Consumer;

import org.bson.Document;



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

	@PostMapping("/Users")
	public void saveUser(@RequestBody User user) {
		saveUserService.saveUser(user);
	}

	@RequestMapping(value = "/authentication", method = RequestMethod.POST, produces="text/plain")
	//@GetMapping("/authentication")
	public String authenticateUser(@RequestBody User user)
	{
		return authService.authenticateUser(user);
	}

	@GetMapping("/Users")
	public List<User> getUsers() {
		return repository.findAll();
	}

	@PostMapping("/returnByEmail")
	public User getUsers(@RequestBody User user) {
		String userEmail = user.getUserEmail();
		return repository.findByUserEmail(userEmail);
	}

	@DeleteMapping("/Users/{id}")
	public String deleteUser(@PathVariable String id) {
		repository.deleteById(id);
		return "user deleted with id : " + id;
	}

	//Deletes all users
	@DeleteMapping("/Users")
	public String deleteAllUsers() {
		repository.deleteAll();
		return "All users delete.";
	}

}
