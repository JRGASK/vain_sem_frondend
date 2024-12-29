export interface ICustomer {

  name :string
  surname: string
  email:string
  password: string
}

export interface ICreatePerson {

  name :string
  surname: string
  email:string
  password: string
  role: string;
  phoneNumber:string
}

export interface IUpdateUser {

  name :string
  surname: string
  role: string;
  phoneNumber:string
}

export interface IUser {
  name :string
  surname: string
  email:string
  role: string

}