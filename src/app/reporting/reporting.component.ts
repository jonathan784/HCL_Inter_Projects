/*
File Name: reporting.component.ts
Component Name: reporting
Purpose: This is a ts file which calls various services to interact with the API, as well as route to other pages.  It performs 
  the logic of the assessment-display component, allowing it to function as needed when individual methods are called.  Ultimately
  this component serves to display the assessments available to the user, as well as to allow an 
Date: 4/15/2021
Group Developer Name: Adv-Access Interns Spring 2021
*/

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { User, UserService } from '../service/user.service';
import { Assessment, AssessmentService } from '../service/assessment.service'; 
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {

  //variable to hold assessments returned based on user role
  assessments: Observable<Assessment>; 
  //variable to hold user information
  user: User = new User(); 
  //specific assessment chosen by user
  assessmentByID: Observable<Assessment>; 
  //variable to hide and show various portions of the html page
  submitted = false; 

  //variables for admin funcationality
  ifAdmin = false; 
  //list of account names associated with the user in the user collection
  accountNames: Observable<any>; 
  //accountName is stored in accountChosen and used to call all assessment attached to that specific account
  accountChosen: string; 
  //assessment.id chosen by the user to view a specific assessment
  selectedOption: string; 

  individualAssessment: Assessment; 
  //testMessage: string; //just for testing

  constructor(private auth: AuthenticationService, private assessmentService: AssessmentService, private userService: UserService) { }

  //Purpose: calls the displayAssessments function on initiation of the page 
  ngOnInit(): void {
    this.displayAssessments(); 
  }

  //Purpose: to receive the email and userRole from the authentication service methods and then to call the 
  //  functions according to the user role
  displayAssessments() {
    this.user.userEmail = this.auth.getUserEmailFromSession(); 
    this.user.userRole = this.auth.getUserRoleFromSession();
    //if a super-admin: can see all assessments for everyone 
    if(this.user.userRole === 'Super-Admin'){
      //this function returns all assessments
      this.retrieveAssessments(); 
    }
    //if an admin: can see all assessments associated with your specific accounts
    else if(this.user.userRole === 'Admin'){
      //calls a function on the api which returns the accounts associated with this email
      this.accountNames = this.userService.getAccountNames(this.user.userEmail); 
      //changes ifAdmin to show drop down box on html page
      this.ifAdmin = true; 
    }
    //if only a user: can see all personal assessments they have individually created
    else {
      this.retrieveUserOnlyAssessments(); 
    }

}
  //Purpose: Used for 'super-admin', retrieves all assessments in entire database
  retrieveAssessments() {
    this.assessments = this.assessmentService.getAssessmentList();
  }

  //Purpose: User for 'admin'.  Gets assessments based on the account designated
  displayAssessmentsFromAccount(account: string) {
    //call a function which returns all assessments for a given account on assessmentService
    //save into this.assessments variable to be pulled from later
    this.assessments = this.assessmentService.getAssessmentsByAccount(account);
  }

  //Purpose: Used for 'user'.  Calls the assessment service getAssessmentsByEmail method (passing in the user as a parameter)
  //  and store the assessments retrieved in this.assessments
  retrieveUserOnlyAssessments() {
    this.assessments = this.assessmentService.getAssessmentsByEmail(this.user); 
  }

  //Purpose: changed submitted variable to true to show other sections of the html page, 
  //  also to get the specific assessment chosen by the user based on the 'selectedOption' value by calling assessment service
  //  and storing this specific assessment in the assessmentByID variable
  onSubmit() {
    this.submitted = true; 
    this.assessmentByID = this.assessmentService.getAssessmentByID(this.selectedOption); 
    this.retrieveIndividualAssessmentQuestionResponses(); //call the below method 
  }

  //the below function is used to pull out the individual questions and responses of the particular assessment of which the user would like to see the details
  retrieveIndividualAssessmentQuestionResponses() 
  {
    this.assessmentByID.subscribe(assessment => {this.individualAssessment = assessment; 
      console.log(this.individualAssessment)}); 
  }

}







