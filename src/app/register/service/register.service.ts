import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomer } from '../../user/IUser';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  constructor(private _http: HttpClient) {}

    public registerPerson(registerUser:ICustomer):Observable<any>{
      console.log();
      return this._http.post('http://localhost:8080/login/register',registerUser);
    }
}