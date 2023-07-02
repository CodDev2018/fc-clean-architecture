import { Sequelize } from "sequelize-typescript";
import ProductModel from '../../../infraestructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infraestructure/product/repository/sequelize/product.repository';
import UpdateProductUseCase from './update.product.usecase';
import ProductFactory from "../../../domain/product/factory/product.factory";


describe("Create Product Use Case Integration test", () => {
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

  it("should create a new product", async () => {
    const repository = new ProductRepository();
    const useCase = new UpdateProductUseCase(repository);
    const product = ProductFactory.create("A", "Product A", 10);
    repository.create(product);
    const input = {
      id: product.id,
      type: "A",
      name: "Product A",
      price: 10,
    };
    const output = {
      ...input,
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });

  it("should throw error when name is blank", async () => {
    const repository = new ProductRepository();
    const useCase = new UpdateProductUseCase(repository);
    const product = ProductFactory.create("A", "Product A", 10);
    repository.create(product);
    const input = {
      id: product.id,
      type: "A",
      name: "",
      price: 10,
    };

    await expect(useCase.execute(input)).rejects.toThrow("Name is required");
  });
});