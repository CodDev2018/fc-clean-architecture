import { v4 as uuid } from 'uuid';
import Customer from '../entity/customer';
import Address from '../value-object/address';
export default class CustomerFactory {

  public static create(name: string, email: string) {
    return new Customer(uuid(), name, email);
  }

  public static createWithAddress(name: string, email: string, street: string, number: number, zip: string, city: string) {
    const customer =  new Customer(uuid(), name, email);
    customer.address = new Address(street, number, zip, city);
    return customer;
  }
}