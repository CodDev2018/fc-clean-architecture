import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Customer from '../../../domain/customer/entity/customer';
import ListCustomerUseCase from './list.customer.usecase';

const customer1 = CustomerFactory.createWithAddress(
  "Jose da Silva",
  "jose@email.com",
  "Rua 1",
  10,
  "12345678",
  "Cidade 1"
);

const customer2 = CustomerFactory.createWithAddress(
  "Maria da Silva",
  "maria@email.com",
  "Rua 2",
  20,
  "87654321",
  "Cidade 2"
);

const MockRepository = (): CustomerRepositoryInterface => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};


describe("List Customer Use Case Unit test", () => {
  it("should list a customers", async () => {
    const repository = MockRepository();
    const listCustomerUseCase = new ListCustomerUseCase(repository);

    const output = await listCustomerUseCase.execute({});

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toEqual(customer1.id);
    expect(output.customers[0].name).toEqual(customer1.name);
    expect(output.customers[0].email).toEqual(customer1.email);
    expect(output.customers[0].address.street).toEqual(customer1.address.street);
    expect(output.customers[1].id).toEqual(customer2.id);
    expect(output.customers[1].name).toEqual(customer2.name);
    expect(output.customers[1].email).toEqual(customer2.email);
    expect(output.customers[1].address.street).toEqual(customer2.address.street);
  });
});