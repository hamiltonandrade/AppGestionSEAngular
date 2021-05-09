import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeComponent} from './employe/employe.component';
import {SocieteComponent} from './societe/societe.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import { EmployeEditComponent } from './employe-edit/employe-edit.component';
import {HttpClientModule} from '@angular/common/http';
import { SocieteEditComponent } from './societe-edit/societe-edit.component';
import { SocieteEmpComponent } from './societe-emp/societe-emp.component';
import { SocieteEmpEditComponent } from './societe-emp-edit/societe-emp-edit.component';
import {DataTablesModule} from 'angular-datatables';


@NgModule({
  declarations: [
    EmployeComponent,
    SocieteComponent,
    DashboardComponent,
    ProfileComponent,
    EmployeEditComponent,
    SocieteEditComponent,
    SocieteEmpComponent,
    SocieteEmpEditComponent
  ],
  exports: [
    EmployeComponent,
    SocieteComponent,
    ProfileComponent,
    ReactiveFormsModule,
    HttpClientModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
  ],
  providers: [ReactiveFormsModule]
})
export class HomeModule { }
