import { v4 as uuid } from 'uuid';
import Customer from '../entity/customer';
export default class CustomerFactory {

  public static create(name: string, email: string) {
    return new Customer(uuid(), name, email);
  }

  public static createWithAddress(name: string, email: string, address: any) {
    const customer =  new Customer(uuid(), name, email);
    customer.address = address;
    return customer;
  }
}