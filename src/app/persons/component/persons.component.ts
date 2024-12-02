import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { LoginService } from '../../login/service/login.service';
import { PersonsService } from '../service/persons.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonCreateDto } from '../person/personCreateDto';

//TODO spravit login get
//TODO spravit put

@Component({
  selector: 'app-persons',
  standalone: true,
  imports: [HttpClientModule, JsonPipe, NgIf, ReactiveFormsModule, FormsModule,CommonModule],
  providers: [LoginService, PersonsService],
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.css',
})
export class PersonsComponent implements OnInit {
  public persons: any;

  public onePerson: any;

  public email = '';

  private personCreateDto: any;

  public users: any[] = [];

  public createdEmail = '';
  public createdName = '';
  public createdSurname = '';
  public createdPassword = '';
  public createdRole = '';
  public createdPhoneNumber = '';

  constructor(
    private _personsService: PersonsService,
    private _loginService: LoginService
  ) {}

  public ngOnInit(): void {
    this.loadData();
  }

  public refreshData():void {
    this.loadData();
  }

  public loadData():void{
    this._personsService.getPersons().subscribe(
      (response: any) => (this.users = response.content),
      (error: any) => console.log(error)
    );
  }

  public getPersonByEmail(): void {
    this._personsService.getPersonByEmail(this.email).subscribe(
      (response: any) => (this.onePerson = response),
      (error: any) => console.log(error)
    );
  }

  public getPersonInfo(user:any): void {
    this._personsService.getPersonByEmail(user.email).subscribe(
      (response: any) => (this.onePerson = response),
      (error: any) => console.log(error)
    );
  }

  public deletePeson(users:any): void{
    this._personsService.deletePerson(users.email).subscribe();
    this.refreshData();
  }

  public createPerson(): void{
    this.personCreateDto = new PersonCreateDto(
      this.createdEmail,
      this.createdName,
      this.createdSurname,
      this.createdPassword,
      this.createdRole,
      this.createdPhoneNumber
    );

    this._personsService.createPerson(this.personCreateDto).subscribe(
      (response: any) => console.log(response),
      (error: any) => console.log(error)
    );
    this.refreshData();
  }

  public logout(): void {
    this._loginService.logout();
  }
}
