import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ValidationErrors, FormControl, AbstractControl} from '@angular/forms';
import { AuthService} from '../../services/auth.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { Mustmatch} from '../../function/confirm.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;
   data: any;
  validationMessages = {

    name: {
      required: '*Le nom est obligatoire',
      minlength: '*Le nom doit être comporter minimun quatre caractères',
      maxlength: '*Le nom doit être comporter maximun vingt caractères ',
      pattern: '*Seul characteurs',
    },
    email: {
      required: '*Email est obligatoire',
      email: '*Email doit être valide'
    },
    confirmEmail: {
      required: '*Confirmation de email est obligatoire',
      mustMatch: '*Email ne correspondent pas',
    },
    password: {
      required: '*Le password est obligatoire\'',
      // minlength: 'Password must be greater than 8 characters',
      // maxlength: 'Password mustbe less than 16 characters',
      pattern: '*Le password doit être comporter minimun 8 caractères'
    }
  };

  formErrors = {
    name: '',
    email: '',
    confirmEmail: '',
    password: '',
  };


  constructor(private fb: FormBuilder, private  dataService: AuthService, private  toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%*&@<>$"+-]{8,}$')]]
    }, {
      validator: Mustmatch('email', 'confirmEmail')
    });

    this.formRegister.valueChanges.subscribe((data) => {
      this.logValidationErros(this.formRegister);
    });
  }

  logValidationErros(group: FormGroup = this.formRegister): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];

        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + '';
          }
        }
      }

    });

  }


  onSubmit(): void {
    if (this.formRegister.invalid) {
      return;
    } else {
      // console.log(this.formRegister.value);
      this.dataService.registerUser(this.formRegister.value).subscribe(resp => {
        this.data = resp;
        // console.log(resp)
        if (this.data.status === 401) {
          this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.status), {
            timeOut: 2000,
            progressBar: true
          });
        } else {
          this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.status), {
            timeOut: 2000,
            progressBar: true
          });
        }
        this.formRegister.get('name').reset();
        this.formRegister.get('email').reset();
        this.formRegister.get('confirmEmail').reset();
        this.formRegister.get('password').reset();

      });
    }
  }
}
