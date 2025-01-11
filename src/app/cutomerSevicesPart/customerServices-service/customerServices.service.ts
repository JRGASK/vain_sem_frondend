import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreateCustomerServices, IUpdateCustomerServices } from '../customerService/ICustomerServices';

@Injectable({
  providedIn: 'root'
})
export class CustomerServicesService {

  constructor(private _http: HttpClient) {
  }

  public getCustomerServices(): Observable<any> {
    return this._http.get<any>('http://localhost:8080/customerServices');
  }

  public getCustomerServiceById(id:string): Observable<any> {
    return this._http.get<any>(`http://localhost:8080/customerServices/customerService/${id}`);
  }

  public createCustomerService(data:ICreateCustomerServices): Observable<any> {
    return this._http.post<any>('http://localhost:8080/customerServices/customerService', data);
  }

  public deletCustomerService(id:string): Observable<any>{
    return this._http.delete<any>(`http://localhost:8080/customerServices/customerService/${id}`);
  }

  public updateCustomerService(id:string, data:IUpdateCustomerServices):Observable<any>{
    return this._http.put(`http://localhost:8080/customerServices/customerService/${id}`,data)
  }


}