import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/component/login.component';
import { SessionService } from './login/session/session.service';
import { PersonsComponent } from './persons/component/persons.component';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [RouterModule, LoginComponent, PersonsComponent],
  providers: [SessionService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'myngapp';
}
