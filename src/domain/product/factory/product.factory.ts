import Product from "../entity/product";
import { v4 as uuid } from "uuid";
import ProductInterface from "../entity/product.interface";
import ProductB from "../entity/product-b";

export default class ProductFactory {

  static create(type: string, name: string, price: number):ProductInterface {
    const id = uuid();
    switch (type) {
      case "A":
        return new Product(id, name, price);
      case "B":
        return new ProductB(id, name, price);
      default:
        throw new Error("Invalid type");
    }
  }

}
