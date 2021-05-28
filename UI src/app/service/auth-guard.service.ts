/*
File Name: auth-guard.service.ts
Service Name: auth-guard
Purpose: This is a ts file which contains the AuthGuardService class, including variables and methods. The method in the AuthGuardService
  class utilizes the AuthencationService class and navigates to another page upon correct authentication. 
Date: 4/15/2021
Group Developer Name: Adv-Access Interns Spring 2021
*/

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  message: string; 

  
  constructor(private router: Router,
    private authService: AuthenticationService) { }


  //Purpose: checks to see if user is logged in through the authentication service, and routes back to login if user is not successfully logged in
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn())
    {
      return true;
    }
    this.message = "Login required before accessing assessments. "; 
    this.router.navigate(['login']);
    return false;

  }

}

