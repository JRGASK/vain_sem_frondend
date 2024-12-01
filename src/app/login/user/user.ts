export class User {

  private _email: string

  private _name: string

  private _surname: string

  private _role: string


  constructor(email: string, name: string, surname: string, role: string) {
    this._email = email;
    this._name = name;
    this._surname = surname;
    this._role = role;
  }

  public get email(): string {
    return this._email;
  }

  public get name(): string {
    return this._name;
  }

  public get surname(): string {
    return this._surname;
  }

  public get role(): string {
    return this._role;
  }
}