import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUsecase from './find.customer.usecase';
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { v4 as uuid } from "uuid";

const customer = new Customer(uuid(), "John", "john@email.com")
const address = new Address("Street 1", 1, "00000-000", "City 1");
customer.address = address;

const MockCustomerRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  } as CustomerRepositoryInterface;
}

describe("Find customer use case unit test", () => {
  it("should find a customer", async () => {
    const customerRepository = MockCustomerRepository();

    const usecase = new FindCustomerUsecase(customerRepository);

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

  it("should throw an error when customer not found", async () => {
    const customerRepository = MockCustomerRepository();
    customerRepository.find = jest.fn().mockImplementation(() => {
      throw new Error("Customer not found");
    });

    const usecase = new FindCustomerUsecase(customerRepository);

    const input = {
      id: "1"
    }

    await expect(usecase.execute(input)).rejects.toThrowError("Customer not found");
  })
});