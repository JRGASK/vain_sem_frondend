import { Component, effect } from '@angular/core';
import { VehicleService } from '../vehicle-service/vehicle.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICreteVehicle } from '../vehicle/IVehicle';
import { Router } from '@angular/router';
import { ErrorService } from '../../error/error.service';
import { NgClass, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../auth/login.service';
import { IUser } from '../../user/IUser';

@Component({
  selector: 'app-create-vehicle',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgClass, HttpClientModule],
  providers: [VehicleService],
  templateUrl: './create-vehicle.component.html',
  styleUrl: './create-vehicle.component.css',
})
export class CreateVehicleComponent {

  private _currentUser: IUser | undefined;

  public createVehicleFormGroup = new FormGroup({
    plateNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    type: new FormControl('', [Validators.minLength(1)]),
    engine: new FormControl('', [Validators.minLength(1)]),
    make: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    email: new FormControl(''),
  });

  constructor(
    private _router: Router,
    private _vehicleService: VehicleService,
    private _errorService: ErrorService,
    private _loginService: LoginService,
  ) {
    effect(() => {
      this._currentUser = this._loginService.currentUser();
    });
  }

  public hasError(formControlName: string, error: string): boolean {
    const formControl = this.createVehicleFormGroup.get(formControlName);

    if (!formControl) {
      return false;
    }

    return formControl?.touched && formControl?.hasError(error);
  }

  public createVehicle() {

    if (!this.isAdmin()){
      this.createVehicleFormGroup.patchValue({
        email: this._currentUser?.email
      })
    }

    const createdVehicle: ICreteVehicle = <ICreteVehicle>{
      plateNumber: this.createVehicleFormGroup.value.plateNumber,
      type: this.createVehicleFormGroup.value.type,
      engine: this.createVehicleFormGroup.value.engine,
      make: this.createVehicleFormGroup.value.make,
      model: this.createVehicleFormGroup.value.model,
      color: this.createVehicleFormGroup.value.color,
      email: this.createVehicleFormGroup.value.email,
    };

    this._vehicleService.createVehicle(createdVehicle).subscribe(
      (response: any) => {
        console.log(response);
        this._router.navigate(['/vehicles']);
      },
      (error: any) => {
        this._errorService.setError = error.error.message;
      }
    );
  }

  public isAdmin():boolean {
    return this._currentUser?.role === 'admin';
  }
}
