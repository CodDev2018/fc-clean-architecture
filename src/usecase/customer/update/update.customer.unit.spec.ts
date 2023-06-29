import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputUpdateCustomerDto } from "./update.customer.dto";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "John Doe",
  "john@email.com",
  "Rua 10",
  152,
  "12345-678",
  "Campo Grande"
);

const input: InputUpdateCustomerDto = {
  id: customer.id,
  name: "John Doe",
  email: "joe@email.com",
  address: {
    street: "Main Street",
    number: 123,
    city: "New York",
    zip: "12345",
  },
};

const MockRepository = (): CustomerRepositoryInterface => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Update Customer Use Case Unit test", () => {
  it("should update a customer", async () => {
    const repository = MockRepository();
    const updateCustomerUseCase = new UpdateCustomerUseCase(repository);

    const output = await updateCustomerUseCase.execute(input);

    expect(output).toEqual(input);
  });

  it("should throw an error when name is missing", async () => {
    const repository = MockRepository();
    const updateCustomerUseCase = new UpdateCustomerUseCase(repository);

    const input2 = { ...input, name: "" };

    await expect(() => updateCustomerUseCase.execute(input2)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw an error when customer is not found", async () => {
    const repository = MockRepository();
    repository.find = jest.fn().mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const updateCustomerUseCase = new UpdateCustomerUseCase(repository);

    const input2 = { ...input, id: "invalid-id" };

    await expect(() => updateCustomerUseCase.execute(input2)).rejects.toThrow(
      "Customer not found"
    );
  });
});
