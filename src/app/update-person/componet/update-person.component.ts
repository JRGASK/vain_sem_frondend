import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../login/service/login.service';
import { SessionService } from '../../login/session/session.service';
import { Router } from '@angular/router';
import { PersonsService } from '../../persons/service/persons.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-update-person',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  providers: [LoginService, SessionService, PersonsService],
  templateUrl: './update-person.component.html',
  styleUrl: './update-person.component.css',
})
export class UpdatePersonComponent implements OnInit {
  user: any;
  email:any;

  constructor(private _router: Router, private _personService: PersonsService) {}

  ngOnInit() {
    const navigationState = this._router.getCurrentNavigation()?.extras.state;
    if (navigationState && navigationState[1]) {
      this.email = navigationState[1];
    } else {
      console.error('Chýbajúci parameter email v state');
    }
  }

  public updatePerson():void{
    const navigation = this._router.getCurrentNavigation();
    const state = navigation?.extras.state as { id: string };
    this._personService.getPersonByEmail(state.id).subscribe(
      (response: any) => console.log(response),
      (error: any) => console.log(error))
  }
}
