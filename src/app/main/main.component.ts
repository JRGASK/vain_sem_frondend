import { Component, effect } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SessionService } from '../login/session/session.service';
import { User } from '../user/user';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  private _currentUser: User | undefined;

  constructor(
    private _router: Router,
    private _sessionService: SessionService
  ) {
    effect(() => {
      this._currentUser = this._sessionService.user;
    });
  }

  public get user() {
    return this._currentUser;
  }

  public showUserName() {
    console.log(this._currentUser?.name);
  }
}
