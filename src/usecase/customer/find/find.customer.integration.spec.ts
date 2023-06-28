import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUsecase from './find.customer.usecase';

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

    const customer = new Customer("1", "John", "john@email.com")
    const address = new Address("Street 1", 1, "00000-000", "City 1");
    customer.address = address;

    await customerRepository.create(customer);

    const input = {
      id: "1"
    }

    const output = {
      id: "1",
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