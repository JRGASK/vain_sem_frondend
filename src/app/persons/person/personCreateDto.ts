export class PersonCreateDto {

  private email: string;

  private name: string;

  private surname: string;

  private password: string;

  private role: string;

  private phoneNumber: string;


  constructor(email: string, name: string, surname: string, password: string, role: string, phoneNumber: string) {
    this.email = email;
    this.name = name;
    this.surname = surname;
    this.password = password;
    this.role = role;
    this.phoneNumber = phoneNumber;
  }


  public get getEmail(): string {
    return this.email;
  }

  public get getName(): string {
    return this.name;
  }

  public get getSurname(): string {
    return this.surname;
  }

  public get getPassword(): string {
    return this.password;
  }

  public get getRole(): string {
    return this.role;
  }

  public get getPhoneNumber(): string {
    return this.phoneNumber;
  }

}