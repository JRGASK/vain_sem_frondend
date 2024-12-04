export class PersonUpdateDto {

  private name: string;
  private surname: string;
  private role: string;
  private phoneNumber: string;


  constructor(name: string, surname: string, role: string, phoneNumber: string) {
    this.name = name;
    this.surname = surname;
    this.role = role;
    this.phoneNumber = phoneNumber;
  }


  public get getName(): string {
    return this.name;
  }


  public get getSurname(): string {
    return this.surname;
  }


  public get getRole(): string {
    return this.role;
  }

  public get getPhoneNumber(): string {
    return this.phoneNumber;
  }

}