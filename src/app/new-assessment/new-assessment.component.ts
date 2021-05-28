/*
File Name: new-assessment.component.ts
Component Name: new-assessment
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
import { Observable, Subscription, interval, Subscriber } from 'rxjs';

@Component({
  selector: 'app-new-assessment',
  templateUrl: './new-assessment.component.html',
  styleUrls: ['./new-assessment.component.css'],

})

export class NewAssessmentComponent implements OnInit {
  submitted = false;
  assessmentChosen = false;
  assessment: Assessment = new Assessment();
  questions: Observable<Question>;
  questionObject: Question = new Question();
  newQuestion: Question = new Question();
  newQuestions: Array<Question> = [];
  subscription: Subscription;


  constructor(private assessmentService: AssessmentService, private questionService: QuestionsService) {}


  ngOnInit(): void {

  }

  //Purpose: saves the text file to the assessment.document variable when a user uploads the text file into the html form
  onChange(event) {
    //isolates the current file from a returned list of files
    const file:File = event.target.files[0];  
    //creates a new fileReader object
    let fileReader = new FileReader(); 

    //.onload executes when the user uploads the document
    //the syntax of => {} allows for the assessment variable to be accessed within this function
    fileReader.onload = (e:any) => {
      //create a string to store the result field of fileReader
      //fileString is an array buffer
      var fileString = fileReader.result; 

      //transforms array buffer to a string and save in the assessment variable
      this.assessment.document = fileString.toString(); 

    }; 

    //feeds the fileReader the uploaded file, required line for functionality
    fileReader.readAsText(file);     
  }

  //Purpose: allows the user to choose an assessment type as well as pulls the questions for that specific type of assessment
  //  and creates the first assessment.  It then receives back the created assessment id, stores that, and calls the autosave function
  //  at 10 second intervals.
  chooseAssessment(): void {
    this.assessmentChosen = true;
    this.questionObject.assessmentType = this.assessment.assessmentType;

    //add in new api call and therefore new call here (send in the questionObject to the method which calls the api function)
    this.questions = this.questionService.getQuestionsByType(this.questionObject);

    //create the assessment for the first time and receive back the string of the assessment
    //save the string into assessment.id

    this.assessment.userEmail = sessionStorage.getItem('userEmail');
    let dateObject = new Date();
    this.assessment.assessmentCreatedDate = dateObject.toString();
    this.assessment.assessmentStatus = "Draft";
    this.assessmentService.newAssessment(this.assessment)
    .subscribe(data => {
      //data returned is an assessment
      //saves the id from the data object (an assessment object) into the current id of the current assessment
      this.assessment.id = data.id;
      },
      error => console.log(error));


    //call the autoSave function every 10 seconds from then on until the form is submitted
    this.subscription = interval(10000).subscribe(x => this.autoSave())

  }

  //Purpose: changes value of submitted to show different div section on html file, creates a new assessment object
  //  to fill over the old assessment object that was used for the previous assessment
  newAssessment(): void{
    this.submitted = false;
    this.assessment = new Assessment();
  }

  //Purpose: changes value of submitted to show different div section on html file, calls the save function
  onSubmit(): void {
    this.submitted = true;
    this.save();

    //ends the autosave functionality
    //currently exists that there is no functionality to end autosave when user does not press the submit button and instead
    //  just navigates to a different page
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

}
