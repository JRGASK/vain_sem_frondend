import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-main-car-page',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './main-car-page.component.html',
  styleUrl: './main-car-page.component.css'
})
export class MainCarPageComponent {
  constructor(
    private _router: Router,
  ) {
  }

  public toReservation():void {
    this._router.navigate(['/createCustomerOrder']);
  }

}
