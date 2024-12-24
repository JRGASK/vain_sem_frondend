import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICustomer } from '../login/user/IUser';
import { Router } from '@angular/router';
import { RegisterService } from './service/register.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
      Validators.minLength(1),
    ]),
    confirmPassword: new FormControl('',
      [Validators.required,
      Validators.minLength(1)
    ])
  });

  constructor(private _router:Router, private _registerService:RegisterService){}

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