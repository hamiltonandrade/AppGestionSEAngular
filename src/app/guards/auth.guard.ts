import {Injectable, NgZone} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import jwtDecode from 'jwt-decode';
import { ErrorHandler, Injector } from '@angular/core';



@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private auth: AuthService, private router: Router, private injector: Injector) {}


  token: any;
  userData: any;
  user: any;
  $errorJWT: any;

  // tslint:disable-next-line:max-line-length
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    // Verifier le user et le token
    if (this.auth.check()) {
      this.token = localStorage.getItem('token');

      try {
        this.userData = jwtDecode(this.token);
      } catch (Exception) {
        this.router.navigate(['/login']);
        return false;
      }

      try {
        this.user = localStorage.getItem('user') ? JSON.parse(atob(localStorage.getItem('user'))) : null;
      } catch (Exception) {
        this.router.navigate(['/login']);
        return false;
      }

      if (this.user.id === this.userData.sub && this.userData.iss === 'http://localhost:8000/api/login' ||
        this.userData.iss === 'http://localhost:8000/api/refresh' ) {
        return true;
      } else {
        console.log(this.user.id);
        console.log(this.userData);
        console.log(this.userData.sub);
        console.log(this.userData.iss);
        return false;
      }

    }
    this.router.navigate(['/login']);
    return false;
  }

  // tslint:disable-next-line:max-line-length
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.auth.check()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
