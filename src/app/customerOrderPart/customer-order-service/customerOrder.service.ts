import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICreateCustomerServices } from '../../cutomerSevicesPart/customerService/ICustomerServices';
import { ICreateCustomerOrder } from '../customerOrder/ICustomerOrder';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService {

  constructor(private _http: HttpClient) {
  }

  public createCustomerOrder(data:ICreateCustomerOrder): Observable<any> {
    return this._http.post<ICreateCustomerOrder>('http://localhost:8080/customerOrders/customerOrder', data);
  }

}