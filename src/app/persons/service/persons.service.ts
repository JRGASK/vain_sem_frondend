import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonCreateDto } from '../person/personCreateDto';
import { PersonUpdateDto } from '../person/personUpdateDto';

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

  public createPerson(personCreateDto: PersonCreateDto):Observable<any> {
    return this._http.post('http://localhost:8080/persons/person', personCreateDto );
  }

  public updatePerson(email: string, personUpdateDto: PersonUpdateDto): Observable<any> {
    return this._http.put(`http://localhost:8080/persons/person/${email}`, personUpdateDto);
  }
}