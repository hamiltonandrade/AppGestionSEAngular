import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeRoutingModule} from './home/home-routing/home-routing.module';
import {HomeModule} from './home/home.module';
import {CommonModule} from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {AuthService} from './services/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule} from 'ngx-toastr';
import {AplicationErrorHandle} from './function/app-error-handle';
import {AppRoutingModule} from './app-routing.module';
import {AuthGuard} from './guards/auth.guard';
import {TokenInterceptor} from './interceptors/token.interceptors';
import {RefreshTokenInterceptors} from './interceptors/refresh-token.interceptors';
import {EmployeService} from './services/employe.service';
import {SocieteService} from './services/societe.service';
import {SocieteempService} from './services/societeemp.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule, AppRoutingModule,
    FormsModule, ReactiveFormsModule, FontAwesomeModule,
    HomeRoutingModule, HomeModule,
    CommonModule, HttpClientModule,
    ToastrModule.forRoot(), BrowserAnimationsModule
  ],
  exports: [
    HomeComponent,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [AuthService, AuthGuard, EmployeService, SocieteService, SocieteempService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptors, multi: true },
    {provide: ErrorHandler, useClass: AplicationErrorHandle},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
