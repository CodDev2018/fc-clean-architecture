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
    let customer = CustomerFactory.createWithAddress(
      "Jose da Silva",
      "josedasilva@email.com",
      "Rua 1",
      10,
      "12345678",
      "Cidade 1"
    );

    expect(customer.id).toBeDefined();
    expect(customer.name).toEqual("Jose da Silva");
    expect(customer.address.street).toEqual("Rua 1");
    expect(customer.address.number).toEqual(10);
    expect(customer.address.zip).toEqual("12345678");
    expect(customer.address.city).toEqual("Cidade 1");
  });
});
