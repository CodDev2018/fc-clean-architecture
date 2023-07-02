import Product from './product';
import { v4 as uuid } from 'uuid';

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Product(uuid(), "", 100);
    }).toThrowError("product: Name is required");
  })

  it("should throw error when price is empty", () => {
    expect(() => {
      new Product(uuid(), "Product 1", 0);
    }).toThrowError("product: Price must be greater than 0");
  })

  it("should throw error when id, name and price are empty", () => {
    expect(() => {
      new Product("", "", 0);
    }).toThrowError("product: Id is required, product: Name is required, product: Price must be greater than 0");
  })

  it("should change name", () => {
    const product = new Product(uuid(), "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  })

  it("should change price", () => {
    const product = new Product(uuid(), "Product 1", 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  })

})