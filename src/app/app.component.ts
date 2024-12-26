import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/component/login.component';
import { SessionService } from './login/session/session.service';
import { PersonsComponent } from './persons/component/persons.component';
import { MainComponent } from './main/main.component';
import { LoginService } from './login/service/login.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [RouterModule, LoginComponent, PersonsComponent,MainComponent,HttpClientModule],
  providers: [LoginService,SessionService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'myngapp';
}
