import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import { User} from '../interfaces/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  data: any;
  token: any;
  user: any;


  validationMessages = {

    email: {
      required: '*Email est obligatoire',
      email: '*Email doit être valide'
    },
    password: {
      required: 'Password is required',
      // minlength: 'Password must be greater than 8 characters',
      // maxlength: 'Password mustbe less than 16 characters',
      pattern: '*Le password doit être comporter minimun 8 caractères'
    }
  };

  formErrors = {
    email: '',
    password: ''
  };


  constructor(private fb: FormBuilder, private  authService: AuthService, private  toastr: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%*&@<>$"+-]{8,}$')]],
    });

    this.formLogin.valueChanges.subscribe((data) => {
      this.logValidationErros(this.formLogin);
    });
  }

  logValidationErros(group: FormGroup = this.formLogin): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErros(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key];

          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
            }
          }
        }
      }
    });

  }

  onSubmit(): void {
    if (this.formLogin.invalid) {
      return;
    } else {

      this.authService.login(this.formLogin.value).subscribe(
        (resp) => {
          this.data = resp;
          this.router.navigate(['home']);
          this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.status),
            {
              timeOut: 2000,
              progressBar: true
            });
        },
        (errorResponse: HttpErrorResponse) => {
          if (errorResponse.status === 401) {

            this.toastr.error(JSON.stringify(errorResponse.error.message), JSON.stringify(errorResponse.status ),
              {
                timeOut: 2000,
                progressBar: true
              });
            this.formLogin.get('email').reset();
            this.formLogin.get('password').reset();
          }
        }
      );

    }
    }
  }
