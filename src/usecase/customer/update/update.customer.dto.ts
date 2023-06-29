export interface InputUpdateCustomerDto {
  id: string;
  name: string;
  email: string;
  address: {
    street: string;
    number: number;
    city: string;
    zip: string;
  };
}

export interface OutputUpdateCustomerDto {
  id: string;
  name: string;
  email: string;
  address: {
    street: string;
    number: number;
    city: string;
    zip: string;
  };
}
