import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment} from '../../environments/environment';
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import 'rxjs-compat/add/operator/do';
import {User} from '../auth/interfaces/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }


  check(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

  login(credentials: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.api_url}/login`, credentials)
      .do(data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', btoa(JSON.stringify(data.user)));
      });
  }

/*
  login(data) {
    return this.http.post(environment.api_url + '/login', data);
  }
  */


  logout(): void {
    this.http.get(`${environment.api_url}/logout`).subscribe(resp => {
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }

  getUser(): User {
    return localStorage.getItem('user') ? JSON.parse(atob(localStorage.getItem('user'))) : null;
  }


  setUser(): Promise<boolean> {
    return this.http.get<any>(`${environment.api_url}/me`).toPromise()
      .then(data => {
        if (data.user) {
          localStorage.setItem('user', btoa(JSON.stringify(data.user)));
          return true;
        }
        return false;
      });
  }

  registerUser(data) {
    return this.http.post(environment.api_url + '/register', data);
  }

  getlistUser() {
    return this.http.get<any>(`${environment.api_url}/listUser`);

  }

}
