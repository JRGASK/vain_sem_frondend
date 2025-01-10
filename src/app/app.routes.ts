import { Route } from '@angular/router';
import { PersonsComponent } from './persons/component/persons.component';
import { LoginComponent } from './login/component/login.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { CreatePersonComponent } from './create-person/create-person.component';
import { MainComponent } from './main/main.component';
import { MainCarPageComponent } from './pages/main-car-page/main-car-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RoleGuard } from '../role.guard';
import { MyAccountComponent } from './my-account/my-account.component';
import { VehiclesComponent } from './vehiclePart/vehicles/vehicles.component';
import { CreateVehicleComponent } from './vehiclePart/create-vehicle/create-vehicle.component';
import {
  CreateCustomerServiceComponent
} from './cutomerSevicesPart/create-customer-service/create-customer-service.component';
import { CustomerServicesComponent } from './cutomerSevicesPart/customer-services/customer-services.component';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'mainCarPage', component: MainCarPageComponent },
  { path: 'mainPage', component: MainPageComponent },
  { path: 'persons', component: PersonsComponent, canActivate: [AuthGuard,RoleGuard] },
  { path: 'createPerson', component: CreatePersonComponent, canActivate: [AuthGuard,RoleGuard]},
  { path: 'main', component: MainComponent, canActivate: [AuthGuard,RoleGuard]},
  { path: 'myAccountInfo', component: MyAccountComponent, canActivate: [AuthGuard]},
  { path: 'vehicles', component: VehiclesComponent, canActivate: [AuthGuard]},
  { path: 'createVehicle', component: CreateVehicleComponent, canActivate: [AuthGuard]},
  { path: 'customerServices', component: CustomerServicesComponent, canActivate: [AuthGuard,RoleGuard]},
  { path: 'createCustomerServices', component: CreateCustomerServiceComponent, canActivate: [AuthGuard,RoleGuard]},
  { path: '',   redirectTo: '/mainPage', pathMatch: 'full' },
];
