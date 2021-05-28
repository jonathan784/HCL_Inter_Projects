/*
File Name: authentication.service.spec.ts
Service Name: authentication
Purpose: This is a specs file which includes the unit tests for angular.  Currently only auto-generate tests exist
Date: 4/15/2021
Group Developer Name: Adv-Access Interns Spring 2021
*/

import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
