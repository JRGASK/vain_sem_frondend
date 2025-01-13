import { Component, effect } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IUser } from '../../user/IUser';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { ErrorService } from '../../error/error.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  constructor(
    private _router: Router,
  ) {
  }

  public toCarsPage():void {
    this._router.navigate(['/mainCarPage']);
  }
}