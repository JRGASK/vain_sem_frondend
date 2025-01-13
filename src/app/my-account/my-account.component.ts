import { Component, effect, OnInit } from '@angular/core';
import { CommonModule, JsonPipe, NgClass, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../auth/login.service';
import { IUpdateMyAcountUser, IUpdateUser, IUser } from '../user/IUser';
import { PersonsService } from '../persons/service/persons.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorService } from '../error/error.service';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgClass, CommonModule, HttpClientModule,JsonPipe],
  providers: [PersonsService],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css',
})
export class MyAccountComponent {

  private _currentUser: IUser | undefined;

  public userData: IUpdateMyAcountUser | undefined;

  public showUpdateForm = false;

  public showMyAcount = true;

  public vehicles:any;

  public updateMyAccountGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(1)]),
    surname: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    phoneNumber: new FormControl('', [
      Validators.minLength(1)]),
  });

  constructor(private _loginService: LoginService, private _personService:PersonsService, private _router:Router, private _errorService:ErrorService){
    effect(() => {
      this._currentUser = this._loginService.currentUser();
      this.getUserData();
    });
  }

  public get currentUser() {
    return this._currentUser;
  }

  public hasError(formControlName: string, error: string): boolean {
    const formControl = this.updateMyAccountGroup.get(formControlName);

    if (!formControl) {
      return false;
    }

    return formControl?.touched && formControl?.hasError(error);
  }

  public updatePerson(): void {
    const updatedPerson : IUpdateUser = <IUpdateUser> {
      name: this.updateMyAccountGroup.value.name,
      surname: this.updateMyAccountGroup.value.surname,
      phoneNumber: this.updateMyAccountGroup.value.phoneNumber,
      role: this._currentUser?.role
    }

    if (this._currentUser){
      this._personService.updatePerson(this._currentUser?.email, updatedPerson).subscribe((response: any) => {
          this.refreshData();
          this.showUpdateForm = false;
          this.showMyAcount = true;
        },
        (error: any) => {
          this._errorService.setError = error.error.message;
        }
      );
    }
  }

  public getUserData(){
    if (this._currentUser){
      this._personService.getPersonByEmail(this._currentUser?.email).subscribe((response: any) => {
        this.userData = response;
        this.refreshData();
      });

      this._personService.getVehicles(this._currentUser?.email).subscribe((response: any) => {
        this.vehicles = response;
        this.refreshData();
      });
    }

  }

  public refreshData(): void {
    this._currentUser = this._loginService.currentUser();
    this._router.navigate(['/myAccountInfo']);
  }

  public updateForm(){
    this.updateMyAccountGroup.patchValue({
        name: this.userData?.name || '',
        surname: this.userData?.surname || '',
        phoneNumber: this.userData?.phoneNumber || ''
      }
    )
    this.showUpdateForm = true;
    this.showMyAcount = false;
  }
}
