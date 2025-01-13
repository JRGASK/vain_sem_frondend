import { Component, effect, OnInit } from '@angular/core';
import { DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomerOrderService } from '../customer-order-service/customerOrder.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../error/error.service';
import { ICreateCustomerOrder } from '../customerOrder/ICustomerOrder';
import { IUser } from '../../user/IUser';
import { LoginService } from '../../auth/login.service';
import { VehicleService } from '../../vehiclePart/vehicle-service/vehicle.service';
import { CustomerServicesService } from '../../cutomerSevicesPart/customerServices-service/customerServices.service';

@Component({
  selector: 'app-create-customer-order',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgClass,
    HttpClientModule,
    FormsModule,
    NgForOf,
  ],
  providers: [CustomerOrderService, VehicleService, CustomerServicesService],
  templateUrl: './create-customer-order.component.html',
  styleUrl: './create-customer-order.component.css',
})
export class CreateCustomerOrderComponent implements OnInit{
  selectedDate = '';

  private _currentUser: IUser | undefined;

  public vehicles: any[] = [];

  public services: any[] = [];

  public createCustomerOrderFormGroup = new FormGroup({
    email: new FormControl(''),
    serviceId: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(255),
    ]),
    vehiclePlateNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(9),
      Validators.minLength(1),
    ]),
    date: new FormControl(''),
  });

  constructor(
    private _router: Router,
    private _customerOrderService: CustomerOrderService,
    private _errorService: ErrorService,
    private _vehicleService: VehicleService,
    private _loginService: LoginService,
    private _customerServiceService: CustomerServicesService,
  ) {
    effect(() => {
      this._currentUser = this._loginService.currentUser();
    });

  }

  ngOnInit(): void {
    this._currentUser = this._loginService.currentUser();
    this.loadData()
  }

  public loadData():void {
    if (this.isAdmin()) {
      this._vehicleService.getVehicles().subscribe(
        (response: any) => {
          this.vehicles = response.content;
        },
        (error: any) => {
          this._errorService.setError = error.error.message;
        }
      );
    } else {
      if (this._currentUser) {
        this._vehicleService
          .getVehicleByEmail(this._currentUser?.email)
          .subscribe(
            (response: any) => {
              this.vehicles = response.content;
            },
            (error: any) => {
              this._errorService.setError = error.error.message;
            }
          );
      }
    }
    this._customerServiceService.getCustomerServices().subscribe(
      (response: any) => {
        this.services = response.content;
      },
      (error: any) => {
        this._errorService.setError = error.error.message;
      }
    );
  }


  public hasError(formControlName: string, error: string): boolean {
    const formControl = this.createCustomerOrderFormGroup.get(formControlName);

    if (!formControl) {
      return false;
    }

    return formControl?.touched && formControl?.hasError(error);
  }

  public createCustomerService() {
    if (!this.isAdmin()) {
      this.createCustomerOrderFormGroup.patchValue({
        email: this._currentUser?.email,
      });
    }

    const createdCustomerOrder: ICreateCustomerOrder = <ICreateCustomerOrder>{
      email: this.createCustomerOrderFormGroup.value.email,
      serviceId: this.createCustomerOrderFormGroup.value.serviceId,
      vehiclePlateNumber:
        this.createCustomerOrderFormGroup.value.vehiclePlateNumber,
      date: this.selectedDate,
    };

    this._customerOrderService
      .createCustomerOrder(createdCustomerOrder)
      .subscribe(
        (response: any) => {
          this._router.navigate(['/customerOrder']);
        },
        (error: any) => {
          this._errorService.setError = error.error.message;
        }
      );
  }

  public isAdmin(): boolean {
    return this._currentUser?.role === 'ADMIN';
  }


}
