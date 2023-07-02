import { Sequelize } from "sequelize-typescript";
import ProductModel from '../../../infraestructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infraestructure/product/repository/sequelize/product.repository';
import FindProductUseCase from './find.product.usecase';
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("Find Product Use Case Integration test", () => {
  let sequilize: Sequelize;

  beforeEach(async () => {
    sequilize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequilize.addModels([ProductModel]);
    await sequilize.sync();
  });

  afterEach(async () => {
    await sequilize.close();
  });

  it("should find a new product", async () => {
    const repository = new ProductRepository();
    const useCase = new FindProductUseCase(repository);

    const product = ProductFactory.create("A", "Product A", 10);
    
    repository.create(product);

    const input = {
      id: product.id
    };

    const output = {
      id: product.id,
      name: product.name,
      price: product.price,
      type: product.type,
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });

  it("should throw error when name is blank", async () => {
    const repository = new ProductRepository();
    const useCase = new FindProductUseCase(repository);
    const input = {
      id: "123"
    };

    await expect(useCase.execute(input)).rejects.toThrow("Product not found");
  });
});