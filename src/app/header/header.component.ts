/*
File Name: header.component.ts
Component Name: header
Purpose: This is a ts file for the header component which initiates the component
Date: 4/15/2021
Group Developer Name: Adv-Access Interns Spring 2021
*/

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public loginService: AuthenticationService) { }

  ngOnInit(): void {
  }

}
