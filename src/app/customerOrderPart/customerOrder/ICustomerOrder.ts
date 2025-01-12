export interface ICustomerOrder {

  id: string;

  dateOfCreate: string;

  date: string;

  price: string;

  serviceId: string;

  vehiclePlateNumber: string;

  email: string;
}

export interface ICreateCustomerOrder {

  date: string;

  price: string;

  serviceId: string;

  vehiclePlateNumber: string;

  email: string;
}

export interface IUpdateCustomerOrder {

  date: string;

  price: string;

  serviceId: string;

  vehiclePlateNumber: string;
}







