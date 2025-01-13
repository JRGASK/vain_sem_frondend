import { ChangeDetectorRef, Component, effect } from '@angular/core';
import { CommonModule, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomerServicesService } from '../customerServices-service/customerServices.service';
import { IUser } from '../../user/IUser';
import { Router } from '@angular/router';
import { ErrorService } from '../../error/error.service';
import { LoginService } from '../../auth/login.service';
import { IUpdateCustomerServices } from '../customerService/ICustomerServices';
import { error } from '@angular/compiler-cli/src/transformers/util';

@Component({
  selector: 'app-customer-services',
  standalone: true,
  imports: [HttpClientModule, JsonPipe, NgIf, ReactiveFormsModule, FormsModule,CommonModule],
  providers: [CustomerServicesService],
  templateUrl: './customer-services.component.html',
  styleUrl: './customer-services.component.css',
})
export class CustomerServicesComponent {

  public oneCustmerService: any;

  public custmerServices: any[] = [];

  public custmerServicesToUpdate: any;

  private _currentUser: IUser | undefined;

  public showUpdateForm = false;

  public showServiceTable = true;

  public showInfoList = false;

  public deleteConfirm = false;

  public updateCustomerServicesFormGroup = new FormGroup({
    name: new FormControl('', [Validators.maxLength(255)]),
    price: new FormControl('', [Validators.maxLength(255)]),
    info: new FormControl('', [Validators.maxLength(255)]),
  });

  constructor(
    private _router: Router,
    private cdr: ChangeDetectorRef,
    private _errorService: ErrorService,
    private _customerServicesService: CustomerServicesService,
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
    this._customerServicesService.getCustomerServices().subscribe(
      (response: any) => (this.custmerServices = response.content),
      (error: any) => this._errorService.setError = error.error.message
    )
  }

  public refreshData(): void {
    this.loadData();
    this.cdr.detectChanges();
    this._router.navigate(['/customerServices']);
  }

  public deleteCustomerService(vehicle: any): void {
    this._customerServicesService.deletCustomerService(vehicle.id).subscribe(
      (deleteResponse: any) => {
        this.deleteConfirm = false;
        this.refreshData();
      },
      (error:any) => this._errorService.setError = error.error.message
    )
  }

  public hideDetails():void {
    this.oneCustmerService = null;
    this.showInfoList = false;
    this.showServiceTable = true;
  }

  public getCustomerServiceInfo(customerService:any): void {
    this._customerServicesService.getCustomerServiceById(customerService.id).subscribe(
      (response: any) => {
        this.oneCustmerService = response;
        this.showInfoList = true;
        this.showServiceTable = false;
      },
      (error: any) => this._errorService.setError = error.error.message
    )
  }

  public updateCustomerServiceFormShow(id:string){
    this._customerServicesService.getCustomerServiceById(id).subscribe(
      (response: any) => {
        this.custmerServicesToUpdate = response;
        if (this.custmerServicesToUpdate) {
          this.updateCustomerServicesFormGroup.patchValue({
            name: this.custmerServicesToUpdate.name || '',
            price: this.custmerServicesToUpdate.price || '',
            info: this.custmerServicesToUpdate.info || '',
          })
        }
        this.showUpdateForm = true;
        this.showServiceTable = false;
        this.refreshData();
      },
      (error:any) => this._errorService.setError = error.error.message
    )
  }

  public updateCustomerService(): void {

    const updateService : IUpdateCustomerServices = <IUpdateCustomerServices> {
      name: this.updateCustomerServicesFormGroup.value.name,
      price: this.updateCustomerServicesFormGroup.value.price,
      info: this.updateCustomerServicesFormGroup.value.info,
    }

    this._customerServicesService.updateCustomerService(this.custmerServicesToUpdate.id, updateService).subscribe(
      (response: any) => {
        this.showUpdateForm = false;
        this.showServiceTable = true;
        this.refreshData();
      },
      (error:any) => this._errorService.setError = error.error.message
    )
  }

  public deleteConfirmation(confirm : boolean){
    this.deleteConfirm = confirm;
  }

  public hasError(formControlName: string, error:string): boolean {
    const formControl = this.updateCustomerServicesFormGroup.get(formControlName);

    if (!formControl) {
      return false;
    }

    return formControl?.touched && formControl?.hasError(error);
  }

  public isAdmin():boolean {
    return this._currentUser?.role === 'ADMIN';
  }


}
