import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICreateCustomerOrder, IUpdateCustomerOrder } from '../customerOrder/ICustomerOrder';
import { Observable } from 'rxjs';
import { IUpdateCustomerServices } from '../../cutomerSevicesPart/customerService/ICustomerServices';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService {

  constructor(private _http: HttpClient) {
  }

  public getAllCustomerOrders():Observable<any> {
    return this._http.get(`http://localhost:8080/customerOrders`);
  }

  public getCustomerOrderByEmail(email:string):Observable<any> {
    return this._http.get(`http://localhost:8080/customerOrders/customerOrder/${email}`)
  }

  public getCustomerOrderById(id:string):Observable<any> {
    console.log(id);
    return this._http.get(`http://localhost:8080/customerOrders/customerOrders/customerOrder/${id}`);
  }

  public createCustomerOrder(data:ICreateCustomerOrder): Observable<any> {
    return this._http.post<ICreateCustomerOrder>('http://localhost:8080/customerOrders/customerOrder', data);
  }

  public deleteCustomerOrderById(orderId:string):Observable<any> {
    return this._http.delete(`http://localhost:8080/customerOrders/customerOrder/${orderId}`);
  }

  public updateCustomerOrder(id:string, data:IUpdateCustomerOrder):Observable<any> {
    console.log(data,id)
    return this._http.put(`http://localhost:8080/customerOrders/customerOrder/${id}`,data)
  }





}