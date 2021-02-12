package com.userserver.mongo1.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

@Document(collection = "User")
public class User {
	@Id
	private int id;
	private String userEmail;
	private String userName;
	private String userPassword;
	private String userrole;
	private String userstatus;

	public String getUserstatus() {
		return userstatus;
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

	public String getUserrole() {
		return userrole;
	}

	public void setUserrole(String userrole) {
		this.userrole = userrole;
	}

	public void setUserstatus(String userstatus) {
		this.userstatus = userstatus;
	}

	public String getId() {
		return null;
	}
	
	@Override
		public String toString() {
		  return "User [id=" + id + ", name=" + userName + ", Role=" + userrole + ", Email=" + userEmail + "]";
		}
	
}
