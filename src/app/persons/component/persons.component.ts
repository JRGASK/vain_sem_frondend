import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { PersonsService } from '../service/persons.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUpdateUser } from '../../user/IUser';
import { ErrorService } from '../../error/error.service';

@Component({
  selector: 'app-persons',
  standalone: true,
  imports: [HttpClientModule, JsonPipe, NgIf, ReactiveFormsModule, FormsModule,CommonModule],
  providers: [PersonsService],
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.css',
})
export class PersonsComponent implements OnInit {

  public onePerson: any;

  public personToUpdate: any;

  public email = '';

  public users: any[] = [];

  public showUpdateForm = false;

  public showPersonTable = true;

  public showInfoList = false;

  public deleteConfirm = false;

  public updatePersonFormGroup = new FormGroup({
    name: new FormControl('',[
      Validators.required,
      Validators.minLength(1),
    ]),
    surname: new FormControl('',[
      Validators.required,
      Validators.minLength(1),
    ]),
    phoneNumber: new FormControl('',
      [Validators.minLength(1)
      ]),
    role: new FormControl('',
      [Validators.required,
      ]),
  },)


  constructor(
    private _personsService: PersonsService,
    private _router: Router,
    private cdr: ChangeDetectorRef,
    private _errorService:ErrorService
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

  public getPersonInfo(user: any): void {
    this._personsService.getPersonByEmail(user.email).subscribe(
      (response: any) => {
        this.onePerson = response
        this.showInfoList = true;
        this.showPersonTable = false;
        this._errorService.setError = "get";
      },
      (error: any) => console.log(error)
    );
  }

  public deletePerson(users: any): void {
    this._personsService.deletePerson(users.email).subscribe(
      (response: any) => {
        this.deleteConfirm = false;
        this.refreshData();
        this._errorService.setError = "delete";
      },
      (error: any) => console.error('Error deleting:', error)
    );
  }

  public deleteConfirmation(confirm : boolean){
    this.deleteConfirm = confirm;
}

  public updatePersonFormShow(email: string): void {

    this._personsService.getPersonByEmail(email).subscribe(
      (response: any) => {
        this.personToUpdate = response;
        if (this.personToUpdate) {

          this.updatePersonFormGroup.patchValue({
            name: this.personToUpdate.name || '',
            surname: this.personToUpdate.surname || '',
            role: this.personToUpdate.role || '',
            phoneNumber: this.personToUpdate.phoneNumber || ''
          });
        }
        this.showUpdateForm = true;
        this.showPersonTable = false;
        this.refreshData();
      },
      (error: any) => this._errorService.setError = error.error
    );
  }

  public updatePerson(): void {
    const updatedPerson : IUpdateUser = <IUpdateUser> {
      name: this.updatePersonFormGroup.value.name,
      surname: this.updatePersonFormGroup.value.surname,
      role: this.updatePersonFormGroup.value.role,
      phoneNumber: this.updatePersonFormGroup.value.phoneNumber
    }

    this._personsService.updatePerson(this.personToUpdate.email, updatedPerson).subscribe((response: any) => {
        this.refreshData();
        this.showUpdateForm = false;
        this.showPersonTable = true;
      },
      (error: any) => {
        this._errorService.setError = error.error.message;
      },
    );
  }

  public hasError(formControlName: string, error:string): boolean {
    const formControl = this.updatePersonFormGroup.get(formControlName);

    if (!formControl) {
      return false;
    }

    return formControl?.touched && formControl?.hasError(error);
  }

  public hidePersonDetails():void {
    this.onePerson = null;
    this.showInfoList = false;
    this.showPersonTable = true;
  }
}
