/*
File Name: assessment-display.component.ts
Component Name: assessment-display
Purpose: This is a ts file which calls various services to interact with the API, as well as route to other pages.  It performs 
  the logic of the assessment-display component, allowing it to function as needed when individual methods are called.  Ultimately
  this component serves to display the assessments available to the user, as well as to allow the user to choose one which they 
  can view and possibly update if desired. 
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
  selector: 'app-assessment-display',
  templateUrl: './assessment-display.component.html',
  styleUrls: ['./assessment-display.component.css']
})
export class AssessmentDisplayComponent implements OnInit {

  //variable to hold all assessments returned back from the api
  assessments: Observable<Assessment>; 
  //user object to store user information in 
  user: User = new User(); 
  //variable to store invidual assessment returned when one is chosen
  assessmentByID: Observable<Assessment>; 
  //variable to show parts of the html page according to whether user has submitted the form or not
  submitted = false; 
  //variable to hold the assessment.id of the assessment chosen by the user on html page
  selectedOption: string; 

  //variable to hold the Assessment object in the assessmentByID observable 
  individualAssessment: Assessment; 

  constructor(private router: Router, private auth: AuthenticationService, private assessmentService: AssessmentService) { }

  //Purpose: calls the displayAssessments function on initiation of the page 
  ngOnInit(): void {
    this.displayAssessments(); 
  }

  //Purpose: to receive the email and userRole from the authentication service methods and then to call the 
  //  retrieveUserOnlyAssessments() function
  displayAssessments() {
    this.user.userEmail = this.auth.getUserEmailFromSession(); 
    this.user.userRole = this.auth.getUserRoleFromSession();  
    this.retrieveUserOnlyAssessments(); 

}

  //Purpose: to call the assessment service getAssessmentsByEmail method (passing in the user as a parameter)
  //  and store the assessments retrieved in this.assessments
  retrieveUserOnlyAssessments() {
    this.assessments = this.assessmentService.getAssessmentsByEmail(this.user); 
    this.assessments.subscribe()
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

  //Purpose: to save the chosen assessmentID in session storage to be used on the update.assessment component, 
  //  and to route the user to the update.assessment component where they can then update this chosen assessment
  updateAssessment() {
    //selectedOption is the id of the assessment chosen
    sessionStorage.setItem('assessmentID', this.selectedOption);
    this.router.navigate(['update.assessment']); 
  }

  
}




