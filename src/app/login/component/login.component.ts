import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  providers: [LoginService],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public username = '';

  public password = '';

  constructor(private loginService: LoginService) {
  }

  public login(){
    this.loginService.login(this.username, this.password).subscribe();
  }
}