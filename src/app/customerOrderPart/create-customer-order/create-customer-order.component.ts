import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomerOrderService } from '../customer-order-service/customerOrder.service';
import { Router } from '@angular/router';
import { CustomerServicesService } from '../../cutomerSevicesPart/customerServices-service/customerServices.service';
import { ErrorService } from '../../error/error.service';
import { ICreateCustomerServices } from '../../cutomerSevicesPart/customerService/ICustomerServices';
import { ICreateCustomerOrder } from '../customerOrder/ICustomerOrder';

@Component({
  selector: 'app-create-customer-order',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule,NgClass, HttpClientModule],
  providers: [CustomerOrderService],
  templateUrl: './create-customer-order.component.html',
  styleUrl: './create-customer-order.component.css'
})
export class CreateCustomerOrderComponent {

  public createCustomerOrderFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    price: new FormControl('', [Validators.minLength(1)]),
    serviceId: new FormControl('', [Validators.minLength(1)]),
    vehiclePlateNumber: new FormControl('', [Validators.minLength(1)]),
    date: new FormControl('', [Validators.minLength(1)]),
  })

  constructor(private _router: Router,
              private _customerOrderService: CustomerOrderService,
              private _errorService: ErrorService,) {
  }

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
      price: this.createCustomerOrderFormGroup.value.price,
      serviceId: this.createCustomerOrderFormGroup.value.serviceId,
      vehiclePlateNumber: this.createCustomerOrderFormGroup.value.vehiclePlateNumber,
      date: this.createCustomerOrderFormGroup.value.date,
    };

    this._customerOrderService.createCustomerOrder(createdCustomerOrder).subscribe(
      (response: any) => {
        console.log(response);
        this._router.navigate(['/']);
      },
      (error: any) => {
        this._errorService.setError = error.error.message;
      }
    );
  }

}
