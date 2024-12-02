import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JsonPipe, NgIf } from '@angular/common';
import { LoginService } from '../../login/service/login.service';
import { PersonsService } from '../service/persons.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-persons',
  standalone: true,
  imports: [HttpClientModule, JsonPipe, NgIf, ReactiveFormsModule, FormsModule],
  providers: [LoginService, PersonsService],
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.css',
})
export class PersonsComponent implements OnInit {
  public persons: any;

  public onePerson: any;

  public email = '';

  constructor(
    private _personsService: PersonsService,
    private _loginService: LoginService
  ) {}

  public ngOnInit(): void {
    this._personsService.getPersons().subscribe(
      (response: any) => (this.persons = response),
      (error: any) => console.log(error)
    );
  }

  public getPersonByEmail(): void {
    this._personsService.getPersonByEmail(this.email).subscribe(
      (response: any) => (this.onePerson = response),
      (error: any) => console.log(error)
    );
  }

  public logout(): void {
    this._loginService.logout();
  }
}
