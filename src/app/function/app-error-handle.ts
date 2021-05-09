import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Component, NgZone, OnInit } from '@angular/core';

@Injectable()
export class AplicationErrorHandle extends ErrorHandler {

  constructor(private injector: Injector, private router: Router, private ngZone: NgZone) {
    super();
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const error = (typeof errorResponse.error !== 'object') ? JSON.parse(errorResponse.error) : errorResponse.error;

      if (errorResponse.status === 401 &&
        (error.error === 'token_expired' || error.error === 'token_invalid' ||
          error.error === 'A token is required' || error.error === 'token_not_provided')) {
        localStorage.clear();
        this.goToLogin();
      }

      if (errorResponse.status === 400 && error.error === 'token_expired') {
        localStorage.clear();
        this.goToLogin();
      }

    }

   // super.handleError('Accès interdit veiller faire le login!!!');
    super.handleError(errorResponse);
  }

  goToLogin(): void {
    this.ngZone.run(() => this.router.navigate(['login'])).then();
  }

}
