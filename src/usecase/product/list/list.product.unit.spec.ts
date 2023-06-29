import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ListProductUseCase from './list.product.usecase';

const product1 = ProductFactory.create("A", "Product A", 10);

const product2 = ProductFactory.create("B", "Product B", 10);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockResolvedValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn(),
  } as ProductRepositoryInterface;
};

describe("List Product Use Case Unit test", () => {
  it("should list all products", async () => {
    const repository = MockRepository();
    const listProductUseCase = new ListProductUseCase(repository);

    const output = await listProductUseCase.execute({});
    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);
    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  });
});
