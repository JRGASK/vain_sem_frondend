import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreteVehicle, IUpdateVehicle } from '../vehicle/IVehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private _http: HttpClient) {
  }

  public getVehicles(): Observable<any> {
    return this._http.get('http://localhost:8080/vehicles')
  }

  public getVehicleByPlateNumber(plate:string): Observable<any> {
    console.log(plate)
    return this._http.get(`http://localhost:8080/vehicles/vehicles/vehicle/${plate}`);
  }

  public getVehicleByEmail(email:string): Observable<any> {
    return this._http.get(`http://localhost:8080/vehicles/${email}`);
  }

  public deleteVehicle(plate:string): Observable<any> {
    console.log(plate);
    return this._http.delete(`http://localhost:8080/vehicles/vehicle/${plate}`);
  }

  public createVehicle(vehicleData:ICreteVehicle): Observable<any>{
    return this._http.post('http://localhost:8080/vehicles', vehicleData);
  }

  public updateVehicle(plate:string ,vehicleData:IUpdateVehicle): Observable<any>{
    console.log(vehicleData , plate);
    return this._http.put(`http://localhost:8080/vehicles/vehicle/${plate}`, vehicleData);
  }

}