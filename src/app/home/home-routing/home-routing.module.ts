import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from '../home.component';
import {RouterModule, Routes} from '@angular/router';
import {EmployeComponent} from './../employe/employe.component';
import {SocieteComponent} from './../societe/societe.component';
import {AuthService} from '../../services/auth.service';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {AuthGuard} from '../../guards/auth.guard';
import {ProfileComponent} from '../profile/profile.component';
import {EmployeEditComponent} from '../employe-edit/employe-edit.component';
import {SocieteEditComponent} from '../societe-edit/societe-edit.component';
import {SocieteEmpComponent} from '../societe-emp/societe-emp.component';
import {SocieteEmpEditComponent} from '../societe-emp-edit/societe-emp-edit.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'home',
        component: HomeComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
          },
          { path: 'dashboard',
            component: DashboardComponent
          },
          { path: 'employe',
            component: EmployeComponent
          },
          { path: 'societe',
            component: SocieteComponent
          },
          { path: 'profil',
            component: ProfileComponent
          },
          { path: 'editEmp/:id',
            component: EmployeEditComponent
          },
          { path: 'editSoc/:id',
            component: SocieteEditComponent
          },
          { path: 'editSocEmp/:id',
            component: SocieteEmpEditComponent
          },
          { path: 'socEmp',
            component: SocieteEmpComponent
          },
        ]
      }
    ])
  ],
  exports: [
    RouterModule,
  ],
  providers: [AuthService]
})

export class HomeRoutingModule { }
