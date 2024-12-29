import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate{

  constructor(private _router: Router) { }

  canActivate(): boolean {
    if (sessionStorage.getItem('user')?.includes("ADMIN")) {
      return true;
    } else {
      this._router.navigate(['/mainPage']);
      return false;
    }
  }
}

