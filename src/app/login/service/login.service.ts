import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService{

  constructor(private _http: HttpClient) {
  }

  public login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password)
    })
    return this._http.post<any>('http://localhost:8080/login',{}, {headers: headers});
  }
}