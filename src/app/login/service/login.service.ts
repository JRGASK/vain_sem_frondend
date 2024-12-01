import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from '../session/session.service';
import { User } from '../user/user';

export interface ILoginResponse {
  email: string;
  name: string;
  surname: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService{

  constructor(private _http: HttpClient, private sessionService: SessionService) {
  }

  public login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password)
    });

    return this._http.post<ILoginResponse>('http://localhost:8080/login',{}, {headers: headers}).pipe(tap(() => sessionStorage.setItem('token', btoa(username + ':' + password))),
      tap((response: ILoginResponse) => this.sessionService.user = new User(response.email,response.name,response.surname,response.role)
      ));
  }

  public logout(): void {
    sessionStorage.removeItem('token');
    this.sessionService.user = undefined;
  }
}