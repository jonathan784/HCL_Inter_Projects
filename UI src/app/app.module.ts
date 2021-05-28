/*
File Name: app.module.ts
Component Name: app
Purpose: This is a ts file which imports angular modules, components, etc. as well as establishes router paths
Date: 4/15/2021
Group Developer Name: Adv-Access Interns Spring 2021
*/


//Base Import 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


//Component
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NewAssessmentComponent } from './new-assessment/new-assessment.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { HomeComponent } from './home/home.component'


//Additional import
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule} from  '@angular/material/button';
import { MatToolbarModule} from  '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout/logout.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuardService } from '../app/service/auth-guard.service';
import { AssessmentDisplayComponent } from './assessment-display/assessment-display.component';
import { UpdateAssessmentComponent } from './update-assessment/update-assessment.component';
import { ReportingComponent } from './reporting/reporting.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewAssessmentComponent, 
    AddUsersComponent,
    HomeComponent,
    LogoutComponent,
    HeaderComponent,
    AssessmentDisplayComponent,
    UpdateAssessmentComponent,
    ReportingComponent,
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MatListModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'add', component: AddUsersComponent},
      { path: 'home', component: HomeComponent , canActivate:[AuthGuardService] },
      { path: 'new.assessment', component: NewAssessmentComponent, canActivate:[AuthGuardService]  }, 
      { path: 'update.assessment', component: UpdateAssessmentComponent, canActivate:[AuthGuardService]},
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent, canActivate:[AuthGuardService] },
      { path: 'assessmentDisplay', component: AssessmentDisplayComponent, canActivate:[AuthGuardService] }, 
      { path: 'header', component: HeaderComponent},
      { path: 'reporting', component: ReportingComponent, canActivate:[AuthGuardService]},
      { path: '**', redirectTo: '/login', pathMatch: 'full' }
    ]),
  ],

  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }