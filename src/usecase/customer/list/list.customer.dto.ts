export interface InputListCustomerDto {}

type Customer = {
  id: string;
  name: string;
  email: string;
  address: {
    street: string;
    number: number;
    city: string;
    zip: string;
  };
};

export interface OutputListCustomerDto {
  customers: Customer[];
}
