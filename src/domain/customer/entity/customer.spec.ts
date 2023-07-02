import Address from "../value-object/address";
import Customer from "./customer";
import {v4 as uuid} from "uuid";

describe("Customer unit tests", () => {
  it("should throw erro when id is empty", () => {
    expect(() => {
      new Customer("", "John Doe", "john@email.com");
    }).toThrowError("customer: Id is required");
  });

  it("should throw erro when name is empty", () => {
    expect(() => {
      new Customer(uuid(), "", "john@email.com");
    }).toThrowError("customer: Name is required");
  });

  it("should throw erro when email is empty", () => {
    expect(() => {
      new Customer(uuid(), "John Doe", "");
    }).toThrowError("customer: Email is required");
  });

  it("should throw erro when email is invalid", () => {
    expect(() => {
      new Customer(uuid(), "John Doe", "johnemail.com");
    }).toThrowError("customer: Email is invalid");
  });

  it("should throw error when id, name and email are empty", () => {
    expect(() => {
      new Customer("", "", "");
    }).toThrowError("customer: Id is required, customer: Name is required, customer: Email is required");
  });

  it("should change name", () => {
    const customer = new Customer(uuid(), "John Doe", "john@email.com");
    customer.changeName("John Doe 2");
    expect(customer.name).toBe("John Doe 2");
  });

  it("should change email", () => {
    const customer = new Customer(uuid(), "John Doe", "john@email.com");
    customer.changeEmail("john2@email.com");
    expect(customer.email).toBe("john2@email.com");
  });

  it("should activate customer", () => {
    const customer = new Customer(uuid(), "John Doe", "john@email.com");
    const address = new Address("Street 1", 123, "12345-123", "Campo Grande");
    customer.address = address;
    
    customer.activate();
    
    expect(customer.isActive()).toBe(true);
  })

  it("should deactivate customer", () => {
    const customer = new Customer(uuid(), "John Doe", "john@email.com");
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it("should throw error when address is undefined", () => {
    expect(() => {
      const customer = new Customer(uuid(), "John Doe", "john@email.com");
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  })

  it("should add reward points", () => {
    const customer = new Customer(uuid(), "John Doe", "john@email.com");
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
