/*
File Name: logout.component.ts
Component Name: logout
Purpose: This is a ts file which calls the authentication logout service as well as routes back to the login page as needed
Date: 4/15/2021
Group Developer Name: Adv-Access Interns Spring 2021
*/

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {


  constructor(private authService: AuthenticationService,
    private router: Router) {

  }

  //Purpose: calls the authentication service logout method
  ngOnInit(): void {
    this.authService.logOut(); 
  }

  //Purpose: routes back to the login page if more login as needed
  loginAgain(): void{
    this.router.navigate(['login']);
  }

}
