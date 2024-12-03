import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PersonStateService {
  private email: string | undefined;

  public setEmail(email: string) {
    this.email = email;
  }

  public getEmail(): string | undefined {
    return this.email;
  }
}