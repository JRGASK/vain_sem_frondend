import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SessionService } from '../session/session.service';


@Component({
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  providers: [LoginService, SessionService],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public username = '';

  public password = '';

  public hasError = false;

  constructor(private loginService: LoginService, private sessionService: SessionService) {
  }

  public get isLoginDisabled(): boolean {
    return this.username.length === 0 || this.password.length === 0;
  }

  public get isLoginRendered(): boolean {
    return !this.sessionService.hasUser;
  }

  public get isLogoutDisabled(): boolean {
    return this.sessionService.hasUser;
  }

  public login(){
    this.loginService.login(this.username, this.password).subscribe(
      () => () => {},
      error => () => {
        this.hasError = true;
      }
    );
  }

  public logout() {
    this.sessionService.user = undefined;
  }
}