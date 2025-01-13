import { ChangeDetectorRef, Component, effect, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from '../../error/error.service';
import { VehicleService } from '../vehicle-service/vehicle.service';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IUpdateVehicle } from '../vehicle/IVehicle';
import { LoginService } from '../../auth/login.service';
import { IUser } from '../../user/IUser';


@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [HttpClientModule, JsonPipe, NgIf, ReactiveFormsModule, FormsModule,CommonModule],
  providers: [VehicleService],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css',
})
export class VehiclesComponent implements OnInit {
  public oneVehicle: any;

  private _currentUser: IUser | undefined;

  public vehicles: any[] = [];

  public vehicleToUpdate: any;

  public vehiclePlateNumber: any;

  public showUpdateForm = false;

  public showVehicleTable = true;

  public showInfoList = false;

  public deleteConfirm = false;

  public updateVehicleFromGroup = new FormGroup({
    plateNumber: new FormControl('',[
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(9),
    ]),
    type: new FormControl('',[Validators.maxLength(255)]),
    engine: new FormControl('',
      [Validators.maxLength(255)]),
    make: new FormControl('',
      [Validators.maxLength(255)]),
    model: new FormControl('',
      [Validators.maxLength(255)]),
    color: new FormControl('',
      [Validators.maxLength(255)]),
    email: new FormControl('',
      [Validators.required,
        Validators.email,
        Validators.maxLength(255)
      ]),
  })

  constructor(
    private _router: Router,
    private cdr: ChangeDetectorRef,
    private _errorService: ErrorService,
    private _vehicleService: VehicleService,
    private _loginService: LoginService
  ) {
    effect(() => {
      this._currentUser = this._loginService.currentUser();
    });
  }

  ngOnInit(): void {
    this._currentUser = this._loginService.currentUser();
    this.loadData();
  }

  public loadData(): void {
    if (this.isAdmin()){
      this._vehicleService.getVehicles().subscribe(
        (response: any) => (this.vehicles = response.content),
        (error: any) => this._errorService.setError = error.error.message
      );
    }else {
      if (this._currentUser) {
        this._vehicleService.getVehicleByEmail(this._currentUser.email).subscribe(
          (response: any) => (this.vehicles = response.content),
          (error: any) => this._errorService.setError = error.error.message
        )
      }
    }
  }

  public refreshData(): void {
    this.loadData();
    this.cdr.detectChanges();
    this._router.navigate(['/vehicles']);
  }

  public deleteVehicle(vehicle: any): void {
    this._vehicleService.deleteVehicle(vehicle.plateNumber).subscribe(
      (deleteResponse: any) => {
        this.deleteConfirm = false;
        this.refreshData();
      },
      (error:any) => this._errorService.setError = error.error.message
    )
  }

  public hidePersonDetails():void {
    this.oneVehicle = null;
    this.showInfoList = false;
    this.showVehicleTable = true;
  }

  public getVehicleInfo(vehicle:any): void {
    console.log(vehicle.plateNumber);
   this._vehicleService.getVehicleByPlateNumber(vehicle.plateNumber).subscribe(
     (response: any) => {
       this.oneVehicle = response;
       this.showInfoList = true;
       this.showVehicleTable = false;
       console.log(response);
       console.log(this.oneVehicle);
     },
     (error:any) => this._errorService.setError = error.error.message
   );
  }

  public updateVehicleFormShow(plate:string){
    this._vehicleService.getVehicleByPlateNumber(plate).subscribe(
      (response: any) => {
        this.vehicleToUpdate = response;
        if (this.vehicleToUpdate) {
          this.updateVehicleFromGroup.patchValue({
            plateNumber: this.vehicleToUpdate.plateNumber || '',
            type: this.vehicleToUpdate.type || '',
            engine: this.vehicleToUpdate.engine || '',
            make: this.vehicleToUpdate.make || '',
            model: this.vehicleToUpdate.model || '',
            color: this.vehicleToUpdate.color || '',
            email: this.vehicleToUpdate.email || ''
          })
        }
        this.showUpdateForm = true;
        this.showVehicleTable = false;
        this.refreshData();
      },
      (error:any) => this._errorService.setError = error.error.message
    )
  }

  public updateVehicle(): void {

    if (!this.isAdmin()){
      this.updateVehicleFromGroup.patchValue({
        email: this._currentUser?.email
      })
    }

    const updatedVehicle : IUpdateVehicle = <IUpdateVehicle> {
      plateNumber: this.updateVehicleFromGroup.value.plateNumber,
      type: this.updateVehicleFromGroup.value.type,
      engine: this.updateVehicleFromGroup.value.engine,
      make: this.updateVehicleFromGroup.value.make,
      model: this.updateVehicleFromGroup.value.model,
      color: this.updateVehicleFromGroup.value.color,
      email: this.updateVehicleFromGroup.value.email
    }

    this._vehicleService.updateVehicle(this.vehicleToUpdate.plateNumber ,updatedVehicle).subscribe(
      (response:any) => {
        this.showUpdateForm = false;
        this.showVehicleTable = true;
        this.refreshData();
      },
      (error:any) => {
        this._errorService.setError = error.error.message;
      },
    );
  }

  public deleteConfirmation(confirm : boolean){
    this.deleteConfirm = confirm;
  }

  public hasError(formControlName: string, error:string): boolean {
    const formControl = this.updateVehicleFromGroup.get(formControlName);

    if (!formControl) {
      return false;
    }

    return formControl?.touched && formControl?.hasError(error);
  }

  public isAdmin():boolean {
    return this._currentUser?.role === 'ADMIN';
  }

}
