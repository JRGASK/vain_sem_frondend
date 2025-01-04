import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from '../../error/error.service';
import { VehicleService } from '../vehicle-service/vehicle.service';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [HttpClientModule, JsonPipe, NgIf, ReactiveFormsModule, FormsModule,CommonModule],
  providers: [VehicleService],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css',
})
export class VehiclesComponent implements OnInit {
  public vehicle: any;

  public vehicles: any[] = [];

  public vehicleToUpdate: any;

  public vehiclePlateNumber: any;

  public showUpdateForm = false;

  public showVehicleTable = true;

  public showInfoList = false;

  public deleteConfirm = false;

  constructor(
    private _router: Router,
    private cdr: ChangeDetectorRef,
    private _errorService: ErrorService,
    private _vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this._vehicleService.getVehicles().subscribe(
      (response: any) => (this.vehicles = response.content),
      (error: any) => console.log(error)
    );
  }

  public refreshData(): void {
    this.loadData();
    this.cdr.detectChanges();
    this._router.navigate(['/vehicles']);
  }

  public deleteVehicle(vehicle: any): void {
    console.log(vehicle.plateNumber)
    this._vehicleService.deleteVehicle(vehicle.plateNumber).subscribe(
      (deleteResponse: any) => {
        this.deleteConfirm = false;
        this.refreshData();
      },
      (error:any) => this._errorService.setError = error.error.message
    )
  }

  public hidePersonDetails():void {
    this.vehicle = null;
    this.showInfoList = false;
    this.showVehicleTable = true;
  }

  public getVehicleInfo(vehicle:any): void {
    return;
  }

  public updateVehicleFormShow(plate:string){
    return;
  }

  public deleteConfirmation(confirm : boolean){
    this.deleteConfirm = confirm;
  }

}
