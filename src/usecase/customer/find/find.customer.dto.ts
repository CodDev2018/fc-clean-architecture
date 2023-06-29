export interface InputFindCustomerDTO {
  id: string;
}

export interface OutputFindCustomerDTO {
  id: string;
  name: string;
  email: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  }
}