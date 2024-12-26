import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './service/register.service';
import { CommonModule, getLocaleTimeFormat } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ICustomer } from '../user/IUser';

export const passwordMismatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  return group.get('password')?.value !== group.get('confirmPassword')?.value ?
    {
      passwordMismatch: true
    }
    : null;
}

export const passwordComplexityValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
  const passwordPattern = RegExp("[a-z]")
  return form.value.match(passwordPattern) ? null : {passwordComplexity : true}
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,HttpClientModule],
  providers: [RegisterService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  public registerFormGroup = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email,
    ]),
    name: new FormControl('',[
      Validators.required,
      Validators.minLength(1),
    ]),
    surname: new FormControl('',[
      Validators.required,
      Validators.minLength(1),
    ]),
    password: new FormControl('',[
      Validators.required,
      passwordComplexityValidator,
      Validators.minLength(1),
    ]),
    confirmPassword: new FormControl('',
      [Validators.required,
      Validators.minLength(1)
    ])
  },{ validators: passwordMismatchValidator});

  constructor(private _router:Router, private _registerService:RegisterService){}

  public hasError(formControlName: string, error:string): boolean {
    const formControl = this.registerFormGroup.get(formControlName);

    if (!formControl) {
      return false;
    }

    return formControl?.touched && formControl?.hasError(error);
  }

  public register (){
    const registerCustomer: ICustomer = <ICustomer>{
      email: this.registerFormGroup.value.email,
      name: this.registerFormGroup.value.name,
      surname: this.registerFormGroup.value.surname,
      password: this.registerFormGroup.value.password,
    };
    this._registerService.registerPerson(registerCustomer).subscribe(
      (response :any) => {
        console.log(response);
        this._router.navigate(["/login"]);
      },
      (error:any) => console.log(error)
    );
  }
}
