/*
File Name: assessment.service.ts
Service Name: assessment
Purpose: This is a ts file which contains the Assessment and AssessmentService classes, including variables and methods. The Assessment
  Service class makes various http calls to the backend API. 
Date: 4/15/2021
Group Developer Name: Adv-Access Interns Spring 2021
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../service/user.service';
import { Question } from './questions.service';

export class Assessment {
  id: string;
  userEmail: string;
  accountName: string;
  applicationName: string;
  assessmentType: string;
  assessmentStatus: string;
  assessmentCreatedDate: string;
  assessmentModifiedDate: string;
  assessmentToolsArea: string[];
  assessment: Array<Question>;
  painAreas: string[];
  objective: string;
  comments: string;
  document: string; 
}

@Injectable({
  providedIn: 'root'
})

export class AssessmentService {
  userEmail: string;
  userPassword: string;
  user: User = new User();
  message: string;
  assessment: Assessment = new Assessment();


  constructor(private http :HttpClient) { }


  getAssessmentList(): Observable<any> {
    return this.http.get('http://advassessassessment.westus.azurecontainer.io:58080/api/assessmentDB');
  }

  getAssessmentsByEmail(user: Object): Observable<any> {
    return this.http.post<any>('http://advassessassessment.westus.azurecontainer.io:58080/api/returnAllByEmail', user);
  }

  saveAssessment(assessment: Object): Observable<any> {
    return this.http.post<any>('http://advassessassessment.westus.azurecontainer.io:58080/api/assessmentDB', assessment);
  }

  getAssessmentByID(id: string): Observable<any>{
    return this.http.get(`http://advassessassessment.westus.azurecontainer.io:58080/api/getAssessmentByID/${id}`);
  }

  getAssessmentsByAccount(accountName: string): Observable<any>{
    return this.http.get(`http://advassessassessment.westus.azurecontainer.io:58080/api/getAssessmentsByAccount/${accountName}`);
  }

  newAssessment(assessment: Object): Observable<any> {
    return this.http.post<any>('http://advassessassessment.westus.azurecontainer.io:58080/api/createNewAssessment', assessment);
  }

}
