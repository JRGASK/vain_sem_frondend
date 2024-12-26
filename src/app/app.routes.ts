import { Route } from '@angular/router';
import { PersonsComponent } from './persons/component/persons.component';
import { LoginComponent } from './login/component/login.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { CreatePersonComponent } from './create-person/create-person.component';
import { MainComponent } from './main/main.component';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'persons', component: PersonsComponent, canActivate: [AuthGuard]},
  { path: 'createPerson', component: CreatePersonComponent, canActivate: [AuthGuard]},
  { path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];
