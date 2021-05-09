import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {AuthService} from '../services/auth.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  user: any;
  name: any;
  email: any;
  constructor( public auth: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>(`${environment.api_url}/me`).subscribe(data => {
      this.user = data.user;
      this.name =  this.user.name;
      this.email =  this.user.email;
    });
  }

  logout(e) {
    e.preventDefault();
    this.auth.logout();
  }

  // Events JAVASCRIP
  btrs(): void {

    // tslint:disable-next-line:only-arrow-functions
    $(document).ready(function() {
      // tslint:disable-next-line:only-arrow-functions
      $('.sidebar-toggle').on('click', function() {
        $('.sidebar').toggleClass('toggled');
      });

      const activee = $('.sidebar .activee');
      if (activee.length && activee.parent('.collapse').length) {
        const parente = activee.parent('.collapse');

        // @ts-ignore
        parente.prev('a').attr('aria-expanded', true);
        parente.addClass('show');
      }
    });
  }

}
