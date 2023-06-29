import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto } from './update.product.dto';
import UpdateProductUseCase from './update.product.usecase';

const product = ProductFactory.create("A", "Product A", 10);

const input: InputUpdateProductDto = { 
  id: product.id,
  name: "Product B",
  price: 20,
};

const MockRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  } as ProductRepositoryInterface;
}


describe("Update Product Use Case Unit test", () => {
  it("should update a product", async () => {
    const repository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(repository);

    await updateProductUseCase.execute(input);

    expect(repository.update).toBeCalledWith(product);
  });

  it("should throw an error when product is not found", async () => {
    const repository = MockRepository();
    repository.find = jest.fn().mockImplementation(() => {
      throw new Error("Product not found");
    });
    const updateProductUseCase = new UpdateProductUseCase(repository);

    await expect(() => updateProductUseCase.execute(input)).rejects.toThrow(
      "Product not found"
    );
  });
});