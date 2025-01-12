import { Component, OnInit } from '@angular/core';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomerOrderService } from '../customer-order-service/customerOrder.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../error/error.service';
import { ICreateCustomerOrder } from '../customerOrder/ICustomerOrder';
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
  ],
  providers: [CustomerOrderService,CustomerServicesService],
  templateUrl: './create-customer-order.component.html',
  styleUrl: './create-customer-order.component.css',
})
export class CreateCustomerOrderComponent{

  selectedDate = '';

  public createCustomerOrderFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    serviceId: new FormControl('', [Validators.minLength(1)]),
    vehiclePlateNumber: new FormControl('', [Validators.minLength(1)]),
    date: new FormControl('', [Validators.minLength(1)]),
  });

  constructor(
    private _router: Router,
    private _customerOrderService: CustomerOrderService,
    private _customerServiceService: CustomerServicesService,
    private _errorService: ErrorService
  ) {}



  public hasError(formControlName: string, error: string): boolean {
    const formControl = this.createCustomerOrderFormGroup.get(formControlName);

    if (!formControl) {
      return false;
    }

    return formControl?.touched && formControl?.hasError(error);
  }

  public createCustomerService() {
    const createdCustomerOrder: ICreateCustomerOrder = <ICreateCustomerOrder>{
      email: this.createCustomerOrderFormGroup.value.email,
      serviceId: this.createCustomerOrderFormGroup.value.serviceId,
      vehiclePlateNumber: this.createCustomerOrderFormGroup.value.vehiclePlateNumber,
      date: this.selectedDate,
    };

    this._customerOrderService
      .createCustomerOrder(createdCustomerOrder)
      .subscribe(
        (response: any) => {
          console.log(response);
          this._router.navigate(['/createCustomerOrder']);
        },
        (error: any) => {
          this._errorService.setError = error.error.message;
        }
      );
  }

}
