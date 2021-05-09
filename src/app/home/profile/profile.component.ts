import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  name: any;
  email: any;

  constructor(public auth: AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>(`${environment.api_url}/me`).subscribe(data => {
      this.user = data.user;
      this.name =  this.user.name;
      this.email =  this.user.email;
    });
  }


}
