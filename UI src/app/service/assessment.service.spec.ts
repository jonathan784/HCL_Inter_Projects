/*
File Name: assessment.service.spec.ts
Service Name: assessment
Purpose: This is a specs file which includes the unit tests for angular.  Currently only auto-generate tests exist
Date: 4/15/2021
Group Developer Name: Adv-Access Interns Spring 2021
*/

import { TestBed } from '@angular/core/testing';

import { AssessmentService } from './assessment.service';

describe('AssessmentService', () => {
  let service: AssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
