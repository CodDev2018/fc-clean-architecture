export interface InputCreateCustomerDto {
  name: string;
  email: string;
  address: {
    street: string;
    number: number;
    city: string;
    zip: string;
  };
}

export interface OutputCreateCustomerDto {
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
