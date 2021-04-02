package com.userserver.mongo1;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@ToString

@Document(collection = "user")
public class User {
	@Id
	private String id;
	private String userEmail;
	private String userName;
	private String userPassword;
	private String userRole;
	private String userStatus;

	public User() {} //no-arg constructor

	//overloaded constructor
	public User(String userEmail, String userName, String userPassword, String userRole, String userStatus)
	{
		this.userEmail = userEmail;
		this.userName = userName;
		this.userPassword = userPassword;
		this.userRole = userRole;
		this.userStatus = userStatus;
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
	
	@Override
		public String toString() {
		  return "User [id=" + id + ", name=" + userName + ", Role=" + userRole + ", Email=" + userEmail + "]";
		}
	
}
