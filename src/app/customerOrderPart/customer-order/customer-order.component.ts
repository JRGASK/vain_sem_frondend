import { ChangeDetectorRef, Component, effect } from '@angular/core';
import { IUser } from '../../user/IUser';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { CustomerOrderService } from '../customer-order-service/customerOrder.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../error/error.service';
import { LoginService } from '../../auth/login.service';


@Component({
  selector: 'app-customer-order',
  standalone: true,
  imports: [HttpClientModule, JsonPipe, NgIf, ReactiveFormsModule, FormsModule,CommonModule],
  providers: [CustomerOrderService],
  templateUrl: './customer-order.component.html',
  styleUrl: './customer-order.component.css'
})
export class CustomerOrderComponent {

  public oneCustmerOrder: any;

  public custmerOrders: any[] = [];

  public custmerOrderToUpdate: any;

  private _currentUser: IUser | undefined;

  public showUpdateForm = false;

  public showOrderTable = true;

  public showInfoList = false;

  public deleteConfirm = false;

  public updateCustomerOrderFormGroup = new FormGroup({
    price: new FormControl('', [Validators.required, Validators.email]),
    serviceId: new FormControl('', [Validators.minLength(1)]),
    vehiclePlateNumber: new FormControl('', [Validators.minLength(1)]),
    date: new FormControl('', [Validators.minLength(1)]),
  });

  constructor(
    private _router: Router,
    private cdr: ChangeDetectorRef,
    private _errorService: ErrorService,
    private _customerOrderService: CustomerOrderService,
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
    this._customerOrderService.getAllCustomerOrders().subscribe(
      (response: any) => (this.custmerOrders = response.content),
      (error: any) => console.log(error))
  }

  public refreshData(): void {
    this.loadData();
    this.cdr.detectChanges();
    this._router.navigate(['/customerServices']);
  }

  public hideDetails():void {
    this.oneCustmerOrder = null;
    this.showInfoList = false;
    this.showOrderTable = true;
  }

  public getCustomerOrderInfo(customerOrder:any): void {
    this._customerOrderService.getCustomerOrderById(customerOrder.id).subscribe(
      (response: any) => {
        this.oneCustmerOrder = response;
        this.showInfoList = true;
        this.showOrderTable = false;
      },
      (error: any) => console.log(error)
    )
  }

  public updateCustomerServiceFormShow(id:string){
  }

  public updateCustomerService(): void {
  }

  public deleteConfirmation(confirm : boolean){
    this.deleteConfirm = confirm;
  }

  public hasError(formControlName: string, error:string): boolean {
    const formControl = this.updateCustomerOrderFormGroup.get(formControlName);

    if (!formControl) {
      return false;
    }

    return formControl?.touched && formControl?.hasError(error);
  }

  public deleteOrderService(vehicle: any): void {
    this._customerOrderService.deleteCustomerOrderById(vehicle.id).subscribe(
      () => {
        this.refreshData();
        this.deleteConfirm = false;
      },
      (error: any) => console.log(error)
    );
  }


}
