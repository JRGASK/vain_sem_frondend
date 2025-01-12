import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/component/login.component';
import { PersonsComponent } from './persons/component/persons.component';
import { MainComponent } from './main/main.component';
import { LoginService } from './auth/login.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrorService } from './error/error.service';
import { VehiclesComponent } from './vehiclePart/vehicles/vehicles.component';
import { CreateVehicleComponent } from './vehiclePart/create-vehicle/create-vehicle.component';
import {
  CreateCustomerServiceComponent
} from './cutomerSevicesPart/create-customer-service/create-customer-service.component';
import { CustomerOrderComponent } from './customerOrderPart/customer-order/customer-order.component';

@Component({
  standalone: true,
  imports: [RouterModule, LoginComponent, PersonsComponent,MainComponent,HttpClientModule, VehiclesComponent, CreateVehicleComponent, CreateCustomerServiceComponent, CreateCustomerServiceComponent, CustomerOrderComponent],
  providers: [ErrorService,LoginService,HttpClientModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

    constructor(private _loginService: LoginService) {
      this._loginService.getUserFromStorage();
    }
}
