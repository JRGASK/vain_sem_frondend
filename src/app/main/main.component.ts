import { Component, effect, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../auth/login.service';
import { IUser } from '../user/IUser';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, CommonModule,HttpClientModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  private  _currentUser: IUser | undefined;

  constructor(
    private _router: Router,
    private _loginService: LoginService,
  ) {
    effect(() => {
      this._currentUser = this._loginService.currentUser();
    });
  }

  public get currentUser() {
    return this._currentUser;
  }

  public set currentUser(user:IUser |undefined) {
     this._currentUser = user;
  }

  public isLogin(): boolean {
    return !!this.currentUser;
  }

  public isAdmin():boolean {
    console.log(this.currentUser?.role);
    return this.currentUser?.role === 'ADMIN';
  }

  public toRegister(){
    this._router.navigate(['/register']);
  }

  public toLogin(){
    this._router.navigate(['/login']);
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
