import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreatePerson, IUpdateUser } from '../../user/IUser';

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

  public deletePerson(email:string): Observable<any>{
    return this._http.delete(`http://localhost:8080/persons/person/${email}`);
  }

  public createPerson(createdPerson: ICreatePerson):Observable<any> {
    return this._http.post('http://localhost:8080/persons/person', createdPerson);
  }

  public updatePerson(email: string, updatedPerson: IUpdateUser): Observable<any> {
    return this._http.put(`http://localhost:8080/persons/person/${email}`, updatedPerson);
  }

  public getVehicles(email:string):Observable<any> {
    return this._http.get(`http://localhost:8080/persons/person/vehicles/${email}`);
  }
}