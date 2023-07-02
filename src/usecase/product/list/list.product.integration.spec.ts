import { Sequelize } from "sequelize-typescript";
import ProductModel from '../../../infraestructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infraestructure/product/repository/sequelize/product.repository';
import ListProductUseCase from './list.product.usecase';
import ProductFactory from "../../../domain/product/factory/product.factory";
import e from "express";

describe("List Product Use Case Integration test", () => {
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

  it("should find any products", async () => {
    const repository = new ProductRepository();
    const useCase = new ListProductUseCase(repository);

    const productA = ProductFactory.create("A", "Product A", 10);
    const productB = ProductFactory.create("B", "Product B", 20);
    
    repository.create(productA);
    repository.create(productB);

    const result = await useCase.execute({});

    expect(result.products.length).toEqual(2);
    expect(result.products[0].id).toEqual(productA.id);
    expect(result.products[0].name).toEqual(productA.name);
    expect(result.products[0].price).toEqual(productA.price);
    expect(result.products[0].type).toEqual(productA.type);
    expect(result.products[1].id).toEqual(productB.id);
    expect(result.products[1].name).toEqual(productB.name);
    expect(result.products[1].price).toEqual(productB.price);
    expect(result.products[1].type).toEqual(productB.type);
  });
});