/*
File Name: assessmnet-display.component.spec.ts
Component Name: assessment-display
Purpose: This is a specs file which includes the unit tests for angular.  Currently only auto-generate tests exist
Date: 4/15/2021
Group Developer Name: Adv-Access Interns Spring 2021
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDisplayComponent } from './assessment-display.component';

describe('AssessmentDisplayComponent', () => {
  let component: AssessmentDisplayComponent;
  let fixture: ComponentFixture<AssessmentDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
