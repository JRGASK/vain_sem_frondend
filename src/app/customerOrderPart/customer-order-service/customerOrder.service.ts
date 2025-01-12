import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICreateCustomerOrder } from '../customerOrder/ICustomerOrder';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService {

  constructor(private _http: HttpClient) {
  }

  public getAllCustomerOrders():Observable<any> {
    return this._http.get(`http://localhost:8080/customerOrders`);
  }

  public createCustomerOrder(data:ICreateCustomerOrder): Observable<any> {
    return this._http.post<ICreateCustomerOrder>('http://localhost:8080/customerOrders/customerOrder', data);
  }

  public deleteCustomerOrderById(orderId:string):Observable<any> {
    return this._http.delete(`http://localhost:8080/customerOrders/customerOrder/${orderId}`);
  }

}