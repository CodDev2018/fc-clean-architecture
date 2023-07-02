import Product from "../../../../domain/product/entity/product";
import ProductInterface from "../../../../domain/product/entity/product.interface";
import ProductFactory from "../../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: ProductInterface): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
      type: entity.type,
    });
  }

  async update(entity: ProductInterface): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<ProductInterface> {
    const product = await ProductModel.findByPk(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return new Product(product?.id, product?.name, product?.price);
  }

  async findAll(): Promise<ProductInterface[]> {
    const products = await ProductModel.findAll();

    if (!products || products.length === 0) {
      throw new Error("Products not found");
    }

    return products.map((product) =>
      ProductFactory.hydrate(
        product?.id,
        product?.name,
        product?.price,
        product?.type
      )
    );
  }
}
