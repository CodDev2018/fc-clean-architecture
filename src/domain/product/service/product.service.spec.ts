import Product from "../entity/product";
import ProductService from './product.service';
import { v4 as uuid } from 'uuid';

describe("Product Service unit tests", () => {
  it("should change the price of all products", () => {
    const product1 = new Product(uuid(), "Product 1", 10);
    const product2 = new Product(uuid(), "Product 2", 20);
    const products = [product1, product2];

    ProductService.increasePrice(products, 100);

    expect(product1.price).toEqual(20);
    expect(product2.price).toEqual(40);
  });
});
