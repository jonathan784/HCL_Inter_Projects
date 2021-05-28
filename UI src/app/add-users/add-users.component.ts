/*
File Name: add-users.component.ts
Component Name: add-users
Purpose: This is a ts file which allows the add-users component to work call various methods, as well as call services which interact 
  with the API calls within those services
Date: 4/15/2021
Group Developer Name: Adv-Access Interns Spring 2021
*/

//imports from angular as well as services and classes created within this application
import { Component, OnInit } from '@angular/core';
import { User, UserService } from 'src/app/service/user.service'; 
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {
  //creates a new instance of user which will have data for fields bound on the html page
  user: User = new User();
  //controls whether certain sections of the html page are shown or not shown, based on whether onSubmit() was called
  submitted = false;
  //stores the account names as a string which is then parsed in to the user.accountNames[] in save() method
  accountName: string; 


  invalidLogin = false;
  invalidLoginMessage: string; 
  resultVar: boolean; 

  //creates a private instance of the UserService so it can interact with the APIs in that service
  constructor(private usersService: UserService, private auth: AuthenticationService) { }

  ngOnInit() {
  }

  //Purpose: creates correct conditions for when a user wants to create a new user instance after having already created one.
  //  Changes the submitted value to false to show user input fields and creates a fresh user instance in which to bind the data
  newUser(): void{
    this.submitted = false;
    this.user = new User();
  }

  //Purpose: modify and corect some data to be able to save correctly in the user collection of the database.  Save the user
  //  instance in the database using the userService instance created in constructor
  save() {
    //save password with base64 encoding
    this.user.userPassword = btoa(this.user.userPassword); 

    //saves user.accountNames as null if nothing entered in to accountNames so as not to throw an exception
    if(this.user.accountNames === undefined){
      this.user.accountNames == null; 
    }
    //parse accountName from input field based on comma and set apart into items to push onto stack
    //removes whitespace so no problems with what users enter when the accountNames[] is pulled in other components
    else {
      //create split with comma
      this.user.accountNames = this.accountName.split(','); 
      //remove whitespace and save back in to user.accountNames[]
      for(var i = 0; i < this.user.accountNames.length; i++) {
        this.user.accountNames[i] = this.user.accountNames[i].trim();
      }
    }

    //use the authentication service to determine if the email and username is already in the database or not
    //call the authenticate method on the auth service instance
    this.auth.authenticate(this.user).subscribe((result)=> { 
      this.resultVar = result; 

      //if user is already in database
      if(result === true){ 
        //displays error message
        this.invalidLogin = true;  
        this.invalidLoginMessage = "User already in database. Please try again."; 
      }
      //if user is NOT already in
      else { 
        //alter the submitted variable to make visible the hidden portion of the html file
        this.submitted = true;

        //calls userService instance and addUser method, sending in the user instance from this file as a parameter
        //calls subscribe function, data is void since method returns nothing
        //logs errors in the call to the console
        this.usersService.addUser(this.user)
        .subscribe(data => {
        }, 
          error => console.log(error));

        //make blank the local variable again so as to use in the next addition
        this.accountName = null; 
        }

        }, 
        error => console.log(error));


  }


}
