package com.userserver.mongo1;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;

@Getter
@Setter

@Document(collection = "user")
public class User {
	@Id
	private String id;
	private String userEmail;
	private String userName;
	private String userPassword;
	private String userRole;
	private String userStatus;
	private String[] accountNames;

	public User() {} //no-arg constructor

	//overloaded constructor
	public User(String userEmail, String userName, String userPassword, String userRole, String userStatus, String[] accountNames)
	{
		this.userEmail = userEmail;
		this.userName = userName;
		this.userPassword = userPassword;
		this.userRole = userRole;
		this.userStatus = userStatus;
		this.accountNames = accountNames;
	}

	public String getUserstatus() {
		return userStatus;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public String getUserRole() {
		return userRole;
	}

	public void setUserrole(String userRole) {
		this.userRole = userRole;
	}

	public void setUserStatus(String userStatus) {
		this.userStatus = userStatus;
	}

	public String getId() {
		return null;
	}

	public String[] getAccountNames() {
		return accountNames;
	}

	public void setAccountNames(String[] accountNames) {
		this.accountNames = accountNames;
	}

	@Override
	public String toString() {
		return "User{" +
				"id='" + id + '\'' +
				", userEmail='" + userEmail + '\'' +
				", userName='" + userName + '\'' +
				", userPassword='" + userPassword + '\'' +
				", userRole='" + userRole + '\'' +
				", userStatus='" + userStatus + '\'' +
				", accountNames=" + Arrays.toString(accountNames) +
				'}';
	}
}
