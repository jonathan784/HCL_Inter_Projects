/*
File Name: new-assessment.component.spec.ts
Component Name: new-assessment
Purpose: This is a specs file which includes the unit tests for angular.  Currently only auto-generate tests exist
Date: 4/15/2021
Group Developer Name: Adv-Access Interns Spring 2021
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewAssessmentComponent } from './new-assessment.component';

describe('NewAssessmentComponent', () => {
  let component: NewAssessmentComponent;
  let fixture: ComponentFixture<NewAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
