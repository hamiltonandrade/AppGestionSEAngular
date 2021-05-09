import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {EmployeService} from '../../services/employe.service';
import {SocieteService} from '../../services/societe.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;
  userL: any;
  emp: any;
  soc: any;
  nbrSoc: any;
  nbrEmp: any;
  nbrUser: any;

  constructor(public auth: AuthService, private employeService: EmployeService, private societeService: SocieteService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.Onconnecte();
    this.getEmployeData();
    this.getSocieteData();
    this.getListeUserData();
  }

  // Verifier la connection du User

  Onconnecte(): void {
    this.http.get<any>(`${environment.api_url}/me`).subscribe(data => {
      this.user = data.user;
    });
  }
  getEmployeData(): void {
    this.employeService.getEmploye().subscribe(res => {
      this.emp = res;
      this.nbrEmp = this.emp.length;
    });
  }

  getSocieteData(): void {
    this.societeService.getSociete().subscribe(res => {
      this.soc = res;
      this.nbrSoc = this.soc.length;
    });
  }

  getListeUserData(): void {
    this.auth.getlistUser().subscribe(res => {
      this.userL = res;
      this.nbrUser = this.userL.length;
    });
  }

}
