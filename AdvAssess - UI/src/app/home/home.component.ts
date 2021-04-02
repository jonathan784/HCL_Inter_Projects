import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../service/user.service';
import { LoginComponent } from 'src/app/login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userRole: string; 

  user1: User = new User();
  returnUser: Object; 
  
  constructor(private auth: AuthenticationService, private loginComp : LoginComponent, private httpClient: HttpClient,private router: Router) { }

  ngOnInit(): void {

  }


}
