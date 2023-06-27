import { v4 as uuid } from "uuid";
import OrderFactory from "./order.factory";
import CustomerFactory from "../../customer/factory/customer.factory";
import Address from "../../customer/value-object/address";
import ProductFactory from "../../product/factory/product.factory";
describe("Order Factory unit test", () => {
  it("should create an order", () => {
    const orderProps = {
      customerId: uuid(),
      items: [
        {
          name: "Product 1",
          productId: uuid(),
          quantity: 1,
          price: 100,
        },
      ],
    };

    const order = OrderFactory.create(orderProps);

    expect(order.id).toBeDefined();
    expect(order.customerId).toEqual(orderProps.customerId);
    expect(order.items.length).toBe(1);
    expect(order.items[0].id).toBeDefined();
    expect(order.items[0].name).toEqual(orderProps.items[0].name);
    expect(order.items[0].productId).toEqual(orderProps.items[0].productId);
    expect(order.items[0].quantity).toEqual(orderProps.items[0].quantity);
    expect(order.items[0].price).toEqual(orderProps.items[0].price);
  });

  it("should create an order with customer", () => {
    const customer = CustomerFactory.createWithAddress(
      "Jose da Silva",
      "josedasilva@email.com",
      new Address("Rua 1", 10, "12345678", "Cidade 1")
    );

    const items = [
      {
        name: "Product 1",
        productId: uuid(),
        quantity: 1,
        price: 100,
      },
    ];

    const order = OrderFactory.createWithCustomer(customer, items);

    expect(order.id).toBeDefined();
    expect(order.customerId).toEqual(customer.id);
    expect(order.items.length).toBe(1);
    expect(order.items[0].id).toBeDefined();
    expect(order.items[0].name).toEqual(items[0].name);
    expect(order.items[0].productId).toEqual(items[0].productId);
    expect(order.items[0].quantity).toEqual(items[0].quantity);
    expect(order.items[0].price).toEqual(items[0].price);
  });

  it("should create an order with customer and products", () => {
    const customer = CustomerFactory.createWithAddress(
      "Jose da Silva",
      "josedasilva@email.com",
      new Address("Rua 1", 10, "12345678", "Cidade 1")
    );

    const products = [
      {
        product: ProductFactory.create("A", "Product 1", 100),
        quantity: 1,
      },
      {
        product: ProductFactory.create("B", "Product 2", 200),
        quantity: 2,
      },
    ];

    const order = OrderFactory.createWithCustomerAndProducts(customer, products);

    expect(order.id).toBeDefined();
    expect(order.customerId).toEqual(customer.id);
    expect(order.items.length).toBe(2);
    expect(order.items[0].id).toBeDefined();
    expect(order.items[0].name).toEqual(products[0].product.name);
    expect(order.items[0].productId).toEqual(products[0].product.id);
    expect(order.items[0].quantity).toEqual(products[0].quantity);
    expect(order.items[0].price).toEqual(products[0].product.price);
    expect(order.items[1].id).toBeDefined();
    expect(order.items[1].name).toEqual(products[1].product.name);
    expect(order.items[1].productId).toEqual(products[1].product.id);
    expect(order.items[1].quantity).toEqual(products[1].quantity);
    expect(order.items[1].price).toEqual(products[1].product.price);
  });
});
