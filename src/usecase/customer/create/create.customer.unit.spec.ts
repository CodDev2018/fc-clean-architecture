import { InputCreateCustomerDto } from "./create.customer.dto";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import CreateCustomerUseCase from "./create.customer.usecase";

const input: InputCreateCustomerDto = {
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
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Create Customer Use Case Unit test", () => {
  it("should create a new customer", async () => {
    const repository = MockRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(repository);

    const output = await createCustomerUseCase.execute(input);

    expect(output).toEqual({ ...input, id: expect.any(String) });
  });

  it("should throw an error when name is missing", async () => {
    const repository = MockRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(repository);

    const input2 = { ...input, name: "" };

    await expect(() => createCustomerUseCase.execute(input2)).rejects.toThrow(
      "Name is required"
    );
  });
});
