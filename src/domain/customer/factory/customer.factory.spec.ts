import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer Factory unit test", () => {
  it("should create a customer", () => {
    let customer = CustomerFactory.create(
      "Jose da Silva",
      "josedasilva@email.com"
    );

    expect(customer.id).toBeDefined();
    expect(customer.name).toEqual("Jose da Silva");
    expect(customer.email).toEqual("josedasilva@email.com");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with address", () => {
    const address = new Address("Rua 1", 10, "12345678", "Cidade 1");
    let customer = CustomerFactory.createWithAddress(
      "Jose da Silva",
      "josedasilva@email.com",
      address
    );

    expect(customer.id).toBeDefined();  
    expect(customer.name).toEqual("Jose da Silva");
    expect(customer.address).toBe(address);
  });
});
