import { Component, effect, OnInit } from '@angular/core';
import { CommonModule, JsonPipe, NgClass, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../auth/login.service';
import { IUpdateMyAcountUser, IUpdateUser, IUser } from '../user/IUser';
import { PersonsService } from '../persons/service/persons.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgClass, CommonModule, HttpClientModule,JsonPipe],
  providers: [PersonsService],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css',
})
export class MyAccountComponent implements OnInit{
  private _currentUser: IUser | undefined;

  public userData: IUpdateMyAcountUser | undefined;

  public showUpdateForm = false;

  public showMyAcount = true;

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

  constructor(private _loginService: LoginService, private _personService:PersonsService) {
    effect(() => {
      this._currentUser = this._loginService.currentUser();
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
      phoneNumber: this.updateMyAccountGroup.value.phoneNumber
    }

    if (this._currentUser){
      this._personService.updatePerson(this._currentUser?.email, updatedPerson).subscribe((response: any) => {
          //this.refreshData();
          this.showUpdateForm = false;
          this.showMyAcount = true;
        },
        (error: any) => console.error('Error creating:', error)
      );
    }
  }

  public getUserData(){
    if (!!this._currentUser){
      this._personService.getPersonByEmail(this._currentUser?.email).subscribe((response: any) => {
        this.userData = response;
      });
    }

  }

  ngOnInit(): void {
    this.getUserData();
  }

}
