import Customer from "./customer";
import Address from "./address";

describe("Customer unit tests", () => {
  it("should throw erro when id is empty", () => {
    expect(() => {
      new Customer("", "John Doe", "john@email.com");
    }).toThrowError("Id is required");
  });

  it("should throw erro when name is empty", () => {
    expect(() => {
      new Customer("1", "", "john@email.com");
    }).toThrowError("Name is required");
  });

  it("should throw erro when email is empty", () => {
    expect(() => {
      new Customer("1", "John Doe", "");
    }).toThrowError("Email is required");
  });

  it("should throw erro when email is invalid", () => {
    expect(() => {
      new Customer("1", "John Doe", "johnemail.com");
    }).toThrowError("Email is invalid");
  });

  it("should change name", () => {
    const customer = new Customer("1", "John Doe", "john@email.com");
    customer.changeName("John Doe 2");
    expect(customer.name).toBe("John Doe 2");
  });

  it("should change email", () => {
    const customer = new Customer("1", "John Doe", "john@email.com");
    customer.changeEmail("john2@email.com");
    expect(customer.email).toBe("john2@email.com");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "John Doe", "john@email.com");
    const address = new Address("Street 1", 123, "12345-123", "Campo Grande");
    customer.address = address;
    
    customer.activate();
    
    expect(customer.isActive()).toBe(true);
  })

  it("should deactivate customer", () => {
    const customer = new Customer("1", "John Doe", "john@email.com");
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it("should throw error when address is undefined", () => {
    expect(() => {
      const customer = new Customer("1", "John Doe", "john@email.com");
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  })
});
