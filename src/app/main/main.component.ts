import { Component, effect } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../auth/login.service';
import { IUser } from '../user/IUser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorService } from '../error/error.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  private _currentUser: IUser | undefined;

  private _error: string | undefined;

  constructor(
    private _router: Router,
    private _loginService: LoginService,
    private _errorService: ErrorService
  ) {
    effect(() => {
      this._currentUser = this._loginService.currentUser();
      this._error = this._errorService.getError();
    });

  }
  public hasErrorMsg(): boolean {
    return !!this._error;
  }

  public closeErrorMsg() {
    this._errorService.setError = undefined;
    this._error = undefined;
  }

  public get getErrorMsg() {
    return this._errorService.getError();
  }

  public get currentUser() {
    return this._currentUser;
  }

  public set currentUser(user: IUser | undefined) {
    this._currentUser = user;
  }

  public isLogin(): boolean {
    return !!this.currentUser;
  }

  public isAdmin(): boolean {
    return this.currentUser?.role === 'ADMIN';
  }

  public toRegister() {
    this._router.navigate(['/register']);
  }

  public toLogin() {
    this._router.navigate(['/login']);
  }

  public logOut() {
    this._loginService.logout();
  }

  public toCreateAPerson() {
    this._router.navigate(['/createPerson']);
  }

  public toTableOfPersons() {
    this._router.navigate(['/persons']);
  }

  public toMainCarPage() {
    this._router.navigate(['/mainCarPage']);
  }

  public toMyAccount() {
    this._router.navigate(['/myAccountInfo']);
  }

  public toTableOfVehicles() {
    this._router.navigate(['/vehicles']);
  }

  public toCreateVehicle() {
    this._router.navigate(['/createVehicle'])
  }

  public toTableOfCustomerServices(){
    this._router.navigate(['/customerServices']);
  }

  public toCreateCustomerServices() {
    this._router.navigate(['/createCustomerServices']);
  }

  public toCreateCustomerOrder() {
    this._router.navigate(['/createCustomerOrder']);
  }

  public toTableOfCustomerOrder(){
    this._router.navigate(['/customerOrder']);
  }

  protected readonly navigator = navigator;
}
