import { Sequelize } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";

describe("Customer repository unit tests", () => {
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

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1", "customer@email.com");
    customer.address = new Address("Street 1", 1, "00000-000", "City 1");
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findByPk("1");

    expect(customerModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "Customer 1",
      email: customer.email,
      active: customer.active,
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      zipCode: customer.address.zip,
      city: customer.address.city,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1", "customer@email.com");
    customer.address = new Address("Street 1", 1, "00000-000", "City 1");;
    await customerRepository.create(customer);

    customer.changeName("Customer 2");
    customer.changeEmail("customer2@email.com");
    customer.address = new Address("Street 2", 2, "11111-111", "City 2");
    customer.addRewardPoints(10);
    customer.deactivate();

    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findByPk("1");

    expect(customerModel?.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      email: customer.email,
      active: customer.active,
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      zipCode: customer.address.zip,
      city: customer.address.city,
    });

  });

  it("should find a product", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1", "customer@email.com");
    const address = new Address("Street 1", 1, "00000-000", "City 1");
    customer.address = address;
    await customerRepository.create(customer);

    const customerFound = await customerRepository.find("1");

    expect(customer).toStrictEqual(customerFound);    
  });

  it("should throw error when product is not found", async () => {
    const customerRepository = new CustomerRepository();

    await expect(customerRepository.find("1")).rejects.toThrow(
      new Error("Customer not found")
    );
  });

  it("should find all products", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("1", "Customer 1", "customer@email.com");
    customer1.address = new Address("Street 1", 1, "00000-000", "City 1");
    await customerRepository.create(customer1);

    const customer2 = new Customer("2", "Customer 2", "customer2@email.com");
    customer2.address = new Address("Street 2", 2, "11111-111", "City 2");
    await customerRepository.create(customer2);

    const customersFound = await customerRepository.findAll();

    expect(customersFound).toHaveLength(2);
    expect(customersFound).toContainEqual(customer1);
    expect(customersFound).toContainEqual(customer2);
  });

  it("should throw error when products are not found", async () => {
    const customerRepository = new CustomerRepository();

    await expect(customerRepository.findAll()).rejects.toThrow(
      new Error("Customers not found")
    );
  });
});
