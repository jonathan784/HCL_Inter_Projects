/*
File Name: user.service.ts
Service Name: user
Purpose: This is a ts file which creates the user and user service classes.  User service makes api calls. 
Date: 4/15/2021
Group Developer Name: Adv-Access Interns Spring 2021
*/


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

export class User {
  id: string;
  userEmail: string;
  userName: string;
  userPassword: string;
  userRole: string;
  userStatus: string;
  accountNames: Array<string>; 
 
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl = 'http://advassessuserms.westus.azurecontainer.io:58081/api/Users';

  constructor(private http :HttpClient) { } //creating an http client object that we can use to perform the api calls


  getUserList(): Observable<any> {
    return this.http.get('http://advassessuserms.westus.azurecontainer.io:58081/api/Users'); 
  }

  getUser(user: Object): Observable<any> {
    return this.http.post<any>('http://advassessuserms.westus.azurecontainer.io:58081/api/returnByEmail', user); 
  }


  get(id: string) {
    return this.http.get('http://advassessuserms.westus.azurecontainer.io:58081/api/Users/${id}'); 
  }

  addUser(user: Object): Observable<any> {
    return this.http.post(this.baseUrl, user); 
  }
  
  getAccountNames(userEmail: string): Observable<any>{
    return this.http.get(`http://advassessuserms.westus.azurecontainer.io:58081/api/getAccountNames/${userEmail}`); 
  }

}
