import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { LoginService } from '../../login/service/login.service';
import { PersonsService } from '../service/persons.service';
import * as console from 'node:console';

@Component({
  selector: 'app-persons',
  standalone: true,
  imports: [HttpClientModule,JsonPipe],
  providers: [LoginService, PersonsService],
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.css'
})
export class PersonsComponent implements OnInit{

  public persons: any;

  constructor(private _personsService: PersonsService, private _loginService: LoginService) {
  }

  public ngOnInit(): void {
    this._personsService.getPersons().subscribe((response: any) => (this.persons = response),
      (error: any) => console.log(error));
  }

  public logout(): void {
    this._loginService.logout();
  }


}
