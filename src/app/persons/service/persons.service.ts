import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  constructor(private _http: HttpClient) {}

  public getPersons():Observable<any> {
   return this._http.get('http://localhost:8080/persons');
  }

  public getPersonByEmail(email:string):Observable<any> {
    return this._http.get(`http://localhost:8080/persons/person/${email}`);
  }
}