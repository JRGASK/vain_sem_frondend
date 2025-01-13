import { Component, effect, OnInit } from '@angular/core';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomerOrderService } from '../customer-order-service/customerOrder.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../error/error.service';
import { ICreateCustomerOrder } from '../customerOrder/ICustomerOrder';
import { CustomerServicesService } from '../../cutomerSevicesPart/customerServices-service/customerServices.service';
import { IUser } from '../../user/IUser';
import { LoginService } from '../../auth/login.service';

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
  providers: [CustomerOrderService],
  templateUrl: './create-customer-order.component.html',
  styleUrl: './create-customer-order.component.css',
})
export class CreateCustomerOrderComponent{

  selectedDate = '';

  private _currentUser: IUser | undefined;

  public createCustomerOrderFormGroup = new FormGroup({
    email: new FormControl(''),
    serviceId: new FormControl('', [Validators.required]),
    vehiclePlateNumber: new FormControl('', [Validators.required]),
    date: new FormControl(''),
  });

  constructor(
    private _router: Router,
    private _customerOrderService: CustomerOrderService,
    private _errorService: ErrorService,
    private _loginService: LoginService
  ) {
    effect(() => {
      this._currentUser = this._loginService.currentUser();
    });
  }



  public hasError(formControlName: string, error: string): boolean {
    const formControl = this.createCustomerOrderFormGroup.get(formControlName);

    if (!formControl) {
      return false;
    }

    return formControl?.touched && formControl?.hasError(error);
  }

  public createCustomerService() {

    if (!this.isAdmin()){
      this.createCustomerOrderFormGroup.patchValue({
        email: this._currentUser?.email
      })
    }

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
          this._router.navigate(['/customerOrder']);
        },
        (error: any) => {
          this._errorService.setError = error.error.message;
        }
      );
  }

  public isAdmin():boolean {
    return this._currentUser?.role === 'ADMIN';
  }


}
