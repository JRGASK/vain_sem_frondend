import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/component/login.component';
import { PersonsComponent } from './persons/component/persons.component';
import { MainComponent } from './main/main.component';
import { LoginService } from './auth/login.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [RouterModule, LoginComponent, PersonsComponent,MainComponent,HttpClientModule],
  providers: [LoginService,HttpClientModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

    constructor(private _loginService: LoginService) {
      this._loginService.getUserFromStorage();
    }
}
