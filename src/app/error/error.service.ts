import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService{

  private readonly _error: WritableSignal<string | undefined> = signal<string | undefined>(undefined);

  public get getError():Signal<string | undefined>{
    return this._error.asReadonly();
  }

  public set setError(error: string | undefined) {
    this._error.set(error);
  }


}
