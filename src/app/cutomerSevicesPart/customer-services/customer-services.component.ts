import { Component } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-services',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgForOf],
  templateUrl: './customer-services.component.html',
  styleUrl: './customer-services.component.css',
})
export class CustomerServicesComponent {

}
