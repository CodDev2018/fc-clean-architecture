import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from './create.product.usecase';

const input: InputCreateProductDto = {
  type: "A",
  name: "Product A",
  price: 10,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  } as ProductRepositoryInterface;
};

describe("Create Product Use Case Unit test", () => {
  it("should create a new product", async () => {
    const repository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(repository);

    const result = await createProductUseCase.execute(input);

    const output = {  
      id: expect.any(String),
      name: "Product A",
      price: 10,
    }

    expect(result).toEqual(output);
  });

  it("should throw an error when name is missing", async () => {
    const repository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(repository);

    const input2 = { ...input, name: "" };

    await expect(() => createProductUseCase.execute(input2)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should price of product B be double", async () => {
    const repository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(repository);

    const input2: InputCreateProductDto = {
      type: "B",
      name: "Product A",
      price: 10,
    };

    const result = await createProductUseCase.execute(input2);

    const output = {  
      id: expect.any(String),
      name: "Product A",
      price: 20,
    }

    expect(result).toEqual(output);
  });
});
