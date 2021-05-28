import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../service/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userEmail: string;
  userPassword: string;
  user: User = new User(); 
  message: string; 
  result: boolean; 


  constructor(private http :HttpClient) { }
  
  authenticate(user: Object): Observable<boolean> {
    return this.http.post<boolean>('http://advassessuserms.westus.azurecontainer.io:58081/api/authentication', user); 

  }

  //Purpose: sets needed values in to session storage so that multiple components can reference these values as needed
  setSessionStorage(userEmail, userRole){
    sessionStorage.setItem('userEmail', userEmail); 
    console.log(userEmail); 
    console.log(userRole); 
    sessionStorage.setItem('userRole', userRole); 
    //save userrole

  }

  getUserEmailFromSession(){
    return sessionStorage.getItem('userEmail'); 
  }

  getUserRoleFromSession(){
    return sessionStorage.getItem('userRole'); 
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('userEmail')
    return (user !== null)
  }

  isUserLoggedOut() {
    let user = sessionStorage.getItem('userEmail')
    return (user == null)
  }

  logOut() {
    sessionStorage.removeItem('userEmail')
  }
}
