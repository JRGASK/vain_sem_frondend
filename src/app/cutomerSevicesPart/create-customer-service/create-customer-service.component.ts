import { Component, effect } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IUser } from '../../user/IUser';
import { Router } from '@angular/router';
import { ErrorService } from '../../error/error.service';
import { LoginService } from '../../auth/login.service';
import { ICreateCustomerServices } from '../customerService/ICustomerServices';
import { CustomerServicesService } from '../customerServices-service/customerServices.service';

@Component({
  selector: 'app-create-customer-service',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule,NgClass, HttpClientModule],
  providers: [CustomerServicesService],
  templateUrl: './create-customer-service.component.html',
  styleUrl: './create-customer-service.component.css',
})
export class CreateCustomerServiceComponent {


  public createCustomerServicesFormGroup = new FormGroup({
    name: new FormControl('', [Validators.maxLength(255)]),
    price: new FormControl('', [Validators.maxLength(255)]),
    info: new FormControl('', [Validators.maxLength(255)]),
  });


  constructor(
    private _router: Router,
    private _customerServicesService: CustomerServicesService,
    private _errorService: ErrorService,
  ) {
  }

  public hasError(formControlName: string, error: string): boolean {
    const formControl = this.createCustomerServicesFormGroup.get(formControlName);

    if (!formControl) {
      return false;
    }

    return formControl?.touched && formControl?.hasError(error);
  }

  public createCustomerService() {

    const createdCustomerService: ICreateCustomerServices = <ICreateCustomerServices>{
      name: this.createCustomerServicesFormGroup.value.name,
      price: this.createCustomerServicesFormGroup.value.price,
      info: this.createCustomerServicesFormGroup.value.info
    };

    this._customerServicesService.createCustomerService(createdCustomerService).subscribe(
      (response: any) => {
        console.log(response);
        this._router.navigate(['/vehicles']);
      },
      (error: any) => {
        this._errorService.setError = error.error.message;
      }
    );
  }

}
