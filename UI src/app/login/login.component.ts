/*
File Name: login.component.ts
Component Name: login
Purpose: This is a ts file which validates the user's login information and provides feedback to the html page to indicate invalid
    user login. If valid login credentials occur the information for the user is stored in session storage. 
Date: 4/15/2021
Group Developer Name: Adv-Access Interns Spring 2021
*/

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { User, UserService } from '../service/user.service';
import { FormGroup} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  resultVar: boolean; 
  userRole: string; 
  userFromDatabase: User; 
 
  loginform: FormGroup;
 
  user: User = new User(); 
 

  constructor(private auth: AuthenticationService,  
              private userService: UserService){}

  ngOnInit(): void {}

  //Purpose: send user email and user password to the authentication service, check to see if the login credentials
  //  are in the database and if not return error messages
  login(){
    //base 64 encode the password
    this.user.userPassword = btoa(this.user.userPassword); 
    //call the authenticate method on the auth service instance
    this.auth.authenticate(this.user).subscribe((result)=> { 
      this.resultVar = result; 
      if(result === true){ 
        this.invalidLogin = false; 
        this.loginSuccess = true; 
        this.successMessage = 'Login Successful!';
        //call getUser on the user service instance
        this.userService.getUser(this.user).subscribe((result2)=>{
          this.userFromDatabase = result2; 
          this.userRole = this.userFromDatabase.userRole;
          //set the userEmail and userRole in the session storage to be accessed later by other components
          this.auth.setSessionStorage(this.user.userEmail, this.userRole); 
        }
      )

      }
      //logic for an invalid login (result === false)
      else {
        this.invalidLogin = true; 
        this.loginSuccess = false; 
      }

    },
    error => console.log(error)); 
  }  
}



