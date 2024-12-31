import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser } from '../user/IUser';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService{

  private readonly _currentUser: WritableSignal<IUser | undefined> = signal<IUser | undefined>(undefined);

  constructor(private _http: HttpClient, private _router: Router, private _errorService:ErrorService) {
  }

  public login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password)
    });

    return this._http.post<IUser>('http://localhost:8080/login',{}, {headers: headers}).pipe(
      tap(() => sessionStorage.setItem('token', btoa(username + ':' + password))),
      tap((user: IUser) => this._currentUser.set(user)),
      tap((user) => sessionStorage.setItem('user', JSON.stringify(user)),
    ));
  }

  public logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this._currentUser.set(undefined);
    this._router.navigate(['/login']);
  }

  public get currentUser():Signal<IUser | undefined> {
    return this._currentUser.asReadonly();
  }

  public getUserFromStorage(): void {
    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('user');
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user) as IUser;
        this._currentUser.set(parsedUser);
      } catch (error) {
        console.error('User not found.', error);
      }
    }else if(!user && token){
      this.logout();
    }
  }
}