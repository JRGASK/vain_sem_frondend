import { Route } from '@angular/router';
import { PersonsComponent } from './persons/component/persons.component';
import { LoginComponent } from './login/component/login.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { CreatePersonComponent } from './create-person/create-person.component';
import { MainComponent } from './main/main.component';
import { MainCarPageComponent } from './pages/main-car-page/main-car-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'mainCarPage', component: MainCarPageComponent },
  { path: 'mainPage', component: MainPageComponent },
  { path: 'persons', component: PersonsComponent, canActivate: [AuthGuard]},
  { path: 'createPerson', component: CreatePersonComponent, canActivate: [AuthGuard]},
  { path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];
