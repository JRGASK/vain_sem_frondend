import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { PersonsService } from '../persons/service/persons.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ICreatePerson } from '../user/IUser';
import { passwordComplexityValidator, passwordMismatchValidator } from '../register/register.component';

@Component({
  selector: 'app-creare-person',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule],
  providers: [PersonsService],
  templateUrl: './create-person.component.html',
  styleUrl: './create-person.component.css'
})
export class CreatePersonComponent {

  public createPersonFormGroup = new FormGroup({
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
      ]),
    phoneNumber: new FormControl('',
      [Validators.minLength(1)
      ]),
    role: new FormControl('',
      [Validators.required,
      ]),
  }, { validators: passwordMismatchValidator})

  constructor(private _router:Router, private _personService:PersonsService){}

  public hasError(formControlName: string, error:string): boolean {
    const formControl = this.createPersonFormGroup.get(formControlName);

    if (!formControl) {
      return false;
    }

    return formControl?.touched && formControl?.hasError(error);
  }

  public createPerson(){
    const createdPerson : ICreatePerson = <ICreatePerson> {
      email: this.createPersonFormGroup.value.email,
      name: this.createPersonFormGroup.value.name,
      surname: this.createPersonFormGroup.value.surname,
      password: this.createPersonFormGroup.value.password,
      confirmPassword: this.createPersonFormGroup.value.confirmPassword,
      phoneNumber: this.createPersonFormGroup.value.phoneNumber,
      role: this.createPersonFormGroup.value.role
    };

    this._personService.createPerson(createdPerson).subscribe(
      (response :any) => {
        console.log(response);
        this._router.navigate(["/persons"]);
      },
      (error:any) => console.log(error)
    );
  }
}
