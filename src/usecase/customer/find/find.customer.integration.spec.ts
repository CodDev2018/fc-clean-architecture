import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUsecase from './find.customer.usecase';
import CustomerModel from "../../../infraestructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infraestructure/customer/repository/sequelize/customer.repository";
import { v4 as uuid } from "uuid";

describe("Find customer use case integration test", () => {
  let sequilize: Sequelize;

  beforeEach(async () => {
    sequilize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequilize.addModels([CustomerModel]);
    await sequilize.sync();
  });

  afterEach(async () => {
    await sequilize.close();
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerUsecase(customerRepository);

    const customer = new Customer(uuid(), "John", "john@email.com")
    const address = new Address("Street 1", 1, "00000-000", "City 1");
    customer.address = address;

    await customerRepository.create(customer);

    const input = {
      id: customer.id
    }

    const output = {
      id: customer.id,
      name: "John",
      email: "john@email.com",
      address: {
        street: "Street 1",
        number: 1,
        zip: "00000-000",
        city: "City 1",
      }
    }

    const result = await usecase.execute(input);

    expect(result).toStrictEqual(output);
  })
});