/*
File Name: update-assessment.component.ts
Component Name: update-assessment
Purpose: This is a ts file which calls various services to interact with the API, as well as route to other pages.  It performs 
  the logic of the new-assessment component, allowing it to function as needed when individual methods are called.  Ultimately
  this component serves to create a new assessment, pulling questions from the question service, as well as saving user input and selections
  and sending the new assessment to the api to be saved.  It also includes autosave functionality.
Date: 4/15/2021
Group Developer Name: Adv-Access Interns Spring 2021
*/




import { Component, OnInit } from '@angular/core';
import { Assessment, AssessmentService } from '../service/assessment.service';
import { Question, QuestionsService } from 'src/app/service/questions.service'; 
import { Observable, Subscription, interval } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-assessment',
  templateUrl: './update-assessment.component.html',
  styleUrls: ['./update-assessment.component.css'],

})

export class UpdateAssessmentComponent implements OnInit {
  submitted = false;  
  invalidMessage: string;
  assessment: Assessment = new Assessment(); 
  question: Question = new Question(); 
  questions: Observable<Question>; 
  questionObject: Question = new Question(); 
  newQuestion: Question = new Question();
  newQuestions: Array<Question> = [];  
  selectedOption: string; 
  subscription: Subscription;
  assessmentID: string; 

  
  constructor(private router: Router, private assessmentService: AssessmentService, private questionService: QuestionsService) { 
   
  }
  //Purpose: receives the information from the previously chosen assessment on "assessment-display" component, pulls the questions for that specific type of assessment
  //  and creates the first assessment.  It then receives back the created assessment id, stores that, and calls the autosave function
  //  at 10 second intervals. 
  ngOnInit(): void {
    this.assessmentID = sessionStorage.getItem('assessmentID'); 

    //return the specific assessment chosen
    this.assessmentService.getAssessmentByID(this.assessmentID)
    .subscribe(data => {
      //data returned is an assessment
      //saves the id from the data object (an assessment object) into the current id of the current assessment
      this.assessment.id = data.id; 

      //save other items into the current assessment
      this.assessment.assessmentType = data.assessmentType; 
      this.questionObject.assessmentType = this.assessment.assessmentType; 
      //send in the questionObject to the method which calls the api function to receive back the correct questions
      this.questions = this.questionService.getQuestionsByType(this.questionObject); 
      this.assessment.accountName = data.accountName; 
      this.assessment.applicationName = data.applicationName; 
      this.assessment.assessmentCreatedDate = data.assessmentCreatedDate; 
      this.assessment.assessmentStatus = "Draft"; 
      this.assessment.comments = data.comments; 
      this.assessment.objective = data.objective; 
      this.assessment.userEmail = data.userEmail; 
      this.assessment.document = data.document; 
      }, 
    error => console.log(error));


    //call the autoSave function every 10 seconds from then on until the form is submitted
    this.subscription = interval(10000).subscribe(x => this.autoSave())
  }


  onChange(event) {

  }
 
  //Purpose: changes value of submitted to show different div section on html file, calls the save function and ends autosave
  onSubmit(): void {
    this.submitted = true; 
    this.save(); 
    //end the autosave functionality
    this.subscription.unsubscribe(); 
  }

  //Purose: saves the questions from the database into the newQuestions array
  saveQuestion(questionFromDatabase: Question): void {
    this.newQuestion.question = questionFromDatabase.question; 
    this.newQuestion.response1 = questionFromDatabase.response1; 
    this.newQuestion.response2 = questionFromDatabase.response2; 
    this.newQuestion.response3 = questionFromDatabase.response3; 
    this.newQuestion.response4 = questionFromDatabase.response4;
    this.newQuestion.assessmentType = questionFromDatabase.assessmentType; 
    this.newQuestion.category = questionFromDatabase.category; 
    this.newQuestion.subCategory = questionFromDatabase.subCategory
    this.newQuestions.push(this.newQuestion);

    //blank out the new Question object each time so it can be used again
    this.newQuestion = new Question(); 

  }

  //Purpose: saves the current information into the assessment when this is called (previously called every 10 seconds)
  autoSave(): void {

    //autosave the current modified time
    let dateObject = new Date(); 
    this.assessment.assessmentModifiedDate = dateObject.toString(); 

    //save the new questions
    this.assessment.assessment = this.newQuestions; 

    //make sure this is being saved as a "draft"
    this.assessmentService.saveAssessment(this.assessment)
    .subscribe(data => {
      }, 
      error => console.log(error));


  }


  //Purpose: saves the assessment in a "complete" v. 'draft' way, and is the final push of this assessment to the database on this page
  save(): void {
    //autofill a bunch of data for the assessment getting created each time
    let dateObject = new Date(); 
    this.assessment.assessmentModifiedDate = dateObject.toString(); 
    
    //save the question data into the assessment
    this.assessment.assessment = this.newQuestions; 

    //update the status as complete v. draft
    this.assessment.assessmentStatus = "Complete"; 

    //call inputValidation function for form, and continue until everything is fixed before inputting

    //save the assessment to the service
    this.assessmentService.saveAssessment(this.assessment)
    .subscribe(data => {
      }, 
      error => console.log(error));
  }

  //Purpose: route back to assessment-display component to view assessment again
  viewAssessmentsRoute() {
    this.router.navigate(['assessmentDisplay']);
  }

}
