import { Route } from '@angular/router';
import { PersonsComponent } from './persons/component/persons.component';
import { LoginComponent } from './login/component/login.component';
import { AuthGuard } from './auth.guard';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'persons', component: PersonsComponent, canActivate: [AuthGuard]},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];
