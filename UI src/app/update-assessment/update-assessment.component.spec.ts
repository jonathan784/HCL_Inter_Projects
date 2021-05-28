/*
File Name: update-assessment.component.spec.ts
Component Name: update-assessment
Purpose: This is a specs file which includes the unit tests for angular.  Currently only auto-generate tests exist
Date: 4/15/2021
Group Developer Name: Adv-Access Interns Spring 2021
*/


import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssessmentComponent } from './update-assessment.component';

describe('UpdateAssessmentComponent', () => {
  let component: UpdateAssessmentComponent;
  let fixture: ComponentFixture<UpdateAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
