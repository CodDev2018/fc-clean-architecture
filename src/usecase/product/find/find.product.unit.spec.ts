import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import FindProductUseCase from './find.product.usecase';

const product = ProductFactory.create("A", "Product A", 10);

const MockRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  } as ProductRepositoryInterface;
};


describe("Find Product Use Case Unit test", () => {
  it("should find a product", async () => {
    const repository = MockRepository();
    const findProductUseCase = new FindProductUseCase(repository);

    const result = await findProductUseCase.execute({id: product.id});

    const output = {
      id: product.id,
      name: product.name,
      price: product.price,
      type: product.type,
    };

    expect(result).toEqual(output);
  });

  it("should throw an error when product is not found", async () => {
    const repository = MockRepository();
    repository.find = jest.fn().mockImplementation(() => {
      throw new Error("Product not found");
    });
    const findProductUseCase = new FindProductUseCase(repository);

    await expect(() => findProductUseCase.execute({id: "invalid-id"})).rejects.toThrow(
      "Product not found"
    );
  });
});
