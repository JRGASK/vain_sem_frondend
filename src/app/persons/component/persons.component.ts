import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { LoginService } from '../../login/service/login.service';
import { PersonsService } from '../service/persons.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonCreateDto } from '../person/personCreateDto';
import { SessionService } from '../../login/session/session.service';
import { Router } from '@angular/router';
import { PersonUpdateDto } from '../person/personUpdateDto';

//TODO spravit login get
//TODO spravit put

@Component({
  selector: 'app-persons',
  standalone: true,
  imports: [HttpClientModule, JsonPipe, NgIf, ReactiveFormsModule, FormsModule,CommonModule],
  providers: [LoginService, PersonsService,SessionService],
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.css',
})
export class PersonsComponent implements OnInit {
  public persons: any;

  public onePerson: any;

  public personToUpdate: any;

  public updateShow = false;

  public email = '';

  private personCreateDto: any;

  private personUpdateDto: any;

  public users: any[] = [];

  public createdEmail = '';
  public createdName = '';
  public createdSurname = '';
  public createdPassword = '';
  public createdRole = '';
  public createdPhoneNumber = '';

  public updatedEmail = '';
  public updatedName = '';
  public updatedSurname = '';
  public updatedRole = '';
  public updatedPhoneNumber = '';

  public reload = false;

  constructor(
    private _personsService: PersonsService,
    private _loginService: LoginService,
    private _router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public refreshData(): void {
    this.loadData();
    this.cdr.detectChanges();
    this._router.navigate(['/persons']);
  }

  public loadData(): void {
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

  public getPersonInfo(user: any): void {
    this._personsService.getPersonByEmail(user.email).subscribe(
      (response: any) => (this.onePerson = response),
      (error: any) => console.log(error)
    );
  }

  public deletePerson(users: any): void {
    this._personsService.deletePerson(users.email).subscribe(
      (response: any) => {
        this.refreshData();
      },
      (error: any) => console.error('Error deleting:', error)
    );
  }

  public createPerson(): void {
    this.personCreateDto = new PersonCreateDto(
      this.createdEmail,
      this.createdName,
      this.createdSurname,
      this.createdPassword,
      this.createdRole,
      this.createdPhoneNumber
    );

    this._personsService.createPerson(this.personCreateDto).subscribe(
      (response: any) => {
        this.refreshData();
        this.resetCreate();
        },
      (error: any) => console.error('Error creating:', error)
    );
  }

  public updatePersonFormShow(email: string): void {
    this._personsService.getPersonByEmail(email).subscribe(
      (response: any) => {
        this.personToUpdate = response;
        this.updateShow = true;
        if (this.personToUpdate) {
          this.updatedName = this.personToUpdate.name;
          this.updatedSurname = this.personToUpdate.surname;
          this.updatedRole = this.personToUpdate.role;
          this.updatedPhoneNumber = this.personToUpdate.phoneNumber;
        }
        this.refreshData();
      },
      (error: any) => console.error('Error fetching person:', error)
    );
  }

  public updatePerson(): void {
    console.log(this.personToUpdate);
    this.personUpdateDto = new PersonUpdateDto(this.updatedName, this.updatedSurname, this.updatedRole, this.updatedPhoneNumber);
    this._personsService.updatePerson(this.personToUpdate.email, this.personUpdateDto).subscribe((response: any) => {
        this.refreshData();
      },
      (error: any) => console.error('Error creating:', error)
    );
  }

  public logout(): void {
    this._loginService.logout();
  }

  public hidePersonDetails():void {
    this.onePerson = null;
  }

  public get isCreateButtonDisabled(): boolean {
    return this.createdName.length === 0 || this.createdSurname.length === 0 ||
            this.createdPassword.length === 0 || this.createdRole.length === 0 ||
            this.createdPhoneNumber.length === 0;

  }

  public get isUpdateButtonDisabled(): boolean {
    return this.updatedName.length === 0 || this.updatedSurname.length === 0 ||
            this.updatedRole.length === 0 || this.updatedPhoneNumber.length === 0;
  }

  public resetCreate(): void {
    this.createdEmail = '';
    this.createdName = '';
    this.createdSurname = '';
    this.createdPassword = '';
    this.createdRole = '';
    this.createdPhoneNumber = '';
  }
}
