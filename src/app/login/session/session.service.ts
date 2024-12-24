import { Injectable } from '@angular/core';
import { User } from '../../user/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _user: User | undefined = undefined;

  public get hasUser(): boolean{
    return this._user != undefined;
  }

  public get user(): User | undefined {
    return this._user;
  }

  public set user(value: User | undefined) {
    this._user = value;
  }

}