import { Component, effect } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SessionService } from '../login/session/session.service';
import { User } from '../user/user';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login/service/login.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  public  _currentUser: User | undefined;
  public  email: string | undefined = '';

  constructor(
    private _router: Router,
    private _sessionService: SessionService,
    private _loginService: LoginService,
  ) {

  }

  public get user() {
    return this._currentUser;
  }

  public showUserName() {
    console.log(this._currentUser?.name);
  }

  public toRegister(){
    this._router.navigate(['/register']);
  }

  public toLogin(){
    this._router.navigate(['/login']);
  }

  public isLogin(): boolean {
    return this._sessionService.hasUser
  }

  public logOut() {
    this._loginService.logout();
  }

  public toCreateAPerson() {
    this._router.navigate(['/createPerson']);
  }

  public toTableOfPersons(){
    this._router.navigate(['/persons']);
  }

  public toMainCarPage() {
    this._router.navigate(['/mainCarPage']);
  }

  protected readonly navigator = navigator;
}
