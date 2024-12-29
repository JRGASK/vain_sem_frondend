import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../auth/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public username = '';

  public password = '';

  private _hasError = false;

  constructor(private _loginService: LoginService, private _router:Router) {
  }

  public get isLoginDisabled(): boolean {
    return this.username.length === 0 || this.password.length === 0;
  }

  public get isLoginRendered(): boolean {
    return !!this._loginService.currentUser;
  }

  public get isLogoutDisabled(): boolean {
    return !this._loginService.currentUser;
  }


  public set hasErrors(value: boolean) {
    this._hasError = value;
  }

  public get hasErrors(): boolean {
    return this._hasError;
  }

  public login() {
    this._loginService
      .login(this.username, this.password)
      .subscribe(() => {
        this.hasErrors = false;
        this._router.navigate(['/persons']);
        //this.userInfo();
      }, () => {
        this.hasErrors = true;
      });
  }

  public logout() {
    this._loginService.logout();
  }

  public register(){
    this._router.navigate(['/register']);
  }

  public userInfo(){
    console.log(!!this._loginService.currentUser);
    console.log(this._loginService.currentUser?.name);
  }
}