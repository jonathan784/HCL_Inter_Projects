import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';


export class Question {
  id: string;
  question: string;
  response1: string; 
  response2: string; 
  response3: string; 
  response4: string;
  selection: string;  
  assessmentType: string;  
  category: string; 
  subCategory: string;  
}

@Injectable({
  providedIn: 'root'
})


export class QuestionsService {
  question: Question = new Question(); 

  constructor(private http :HttpClient) { }

  getAllQuestions(): Observable<any> {
    return this.http.get('http://advassessquestionms.westus.azurecontainer.io:58082/api/getAllQuestions'); 
  }

  insertQuestion(question: Object): Observable<any> {
    return this.http.post<any>('http://advassessquestionms.westus.azurecontainer.io:58082/api/insertQuestion', question); 
  }

  getQuestionsByType(question: Object): Observable<any> {
    return this.http.post<any>('http://advassessquestionms.westus.azurecontainer.io:58082/api/returnAllByAssessmentType', question); 
  }

}
