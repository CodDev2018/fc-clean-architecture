import { Sequelize } from "sequelize-typescript";
import ProductRepository from "./product.repository";
import Product from "../../../../domain/product/entity/product";
import ProductModel from './product.model';

describe("Product repository unit tests", () => {
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

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);

    await productRepository.create(product);

    const productModel = await ProductModel.findByPk("1");

    expect(productModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 10,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);

    await productRepository.create(product);

    product.changeName("Product 2");
    product.changePrice(20);

    await productRepository.update(product);

    const productModel = await ProductModel.findByPk("1");

    expect(productModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 2",
      price: 20,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);

    await productRepository.create(product);

    const productModel = await ProductModel.findByPk("1");
    const foundProduct = await productRepository.find("1");

    expect(productModel?.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });

  it("should throw error when product is not found", async () => {
    const productRepository = new ProductRepository();

    await expect(productRepository.find("1")).rejects.toThrowError(
      "Product not found"
    );
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product("1", "Product 1", 10);
    const product2 = new Product("2", "Product 2", 20);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product1, product2];

    expect(products).toStrictEqual(foundProducts);
  });

  it("should throw error when products are not found", async () => {
    const productRepository = new ProductRepository();

    await expect(productRepository.findAll()).rejects.toThrowError(
      "Products not found"
    );
  });
});
