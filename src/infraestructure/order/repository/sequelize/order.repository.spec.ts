import { Sequelize } from 'sequelize-typescript';
import OrderModel from './order.model';
import OrderRepository from './order.repository';
import OrderItemModel from './/order_item.model';
import CustomerModel from '../../../customer/repository/sequelize/customer.model';
import ProductModel from '../../../product/repository/sequelize/product.model';
import CustomerRepository from '../../../customer/repository/sequelize/customer.repository';
import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/value-object/address';
import ProductRepository from '../../../product/repository/sequelize/product.repository';
import Product from '../../../../domain/product/entity/product';
import OrderItem from '../../../../domain/checkout/entity/order_item';
import Order from '../../../../domain/checkout/entity/order';
import { v4 as uuid } from 'uuid';

describe("Order repository unit tests", () => {

  let sequilize: Sequelize;

  beforeEach(async () => {
    sequilize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequilize.addModels([CustomerModel, ProductModel, OrderModel, OrderItemModel]);
    await sequilize.sync();
  });

  afterEach(async () => {
    await sequilize.close();
  });

  it("should create an new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(uuid(), "Customer 1", "customer@email.com");
    customer.address = new Address("Street 1", 1, "00000-000", "City 1");
    customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product(uuid(), "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem("oi1", product.id, "Product 1", 10, 2);
    const order = new Order("o1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"]
    });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total,
      items: [
        {
          id: orderItem.id,
          product_id: product.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
        }
      ]
    })
  })

  it("should update an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(uuid(), "Customer 1", "customer@email.com");
    customer.address = new Address("Street 1", 1, "00000-000", "City 1");
    customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product(uuid(), "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem("oi1", product.id, "Product 1", 10, 2);
    const orderItem2 = new OrderItem("oi2", product.id, "Product 1", 10, 3);
    const order = new Order("o1", customer.id, [orderItem, orderItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderItem3 = new OrderItem("oi3", product.id, "Product 1", 10, 3);
    order.addItem(orderItem3);
    order.removeItem(orderItem);

    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"]
    });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total,
      items: [
        {
          id: orderItem2.id,
          product_id: product.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: order.id,
        },
        {
          id: orderItem3.id,
          product_id: product.id,
          name: orderItem3.name,
          price: orderItem3.price,
          quantity: orderItem3.quantity,
          order_id: order.id,
        },
      ]
    })

  })

  it("should find an order by id", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(uuid(), "Customer 1", "customer@email.com");
    customer.address = new Address("Street 1", 1, "00000-000", "City 1");
    customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product(uuid(), "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem("oi1", product.id, "Product 1", 10, 2);
    const order = new Order("o1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const findedOrder = await orderRepository.find(order.id);

    expect(findedOrder).toStrictEqual(order);
  })

  it("should throw error when order not found", async () => {
    const orderRepository = new OrderRepository();
    await expect(orderRepository.find("o1")).rejects.toThrowError("Order not found");
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(uuid(), "Customer 1", "customer@email.com");
    customer.address = new Address("Street 1", 1, "00000-000", "City 1");
    customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product(uuid(), "Product 1", 10);
    await productRepository.create(product);

    const orderItem1 = new OrderItem("oi1", product.id, "Product 1", 10, 2);
    const order1 = new Order("o1", customer.id, [orderItem1]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order1);

    const orderItem2 = new OrderItem("oi2", product.id, "Product 1", 10, 2);
    const order2 = new Order("o2", customer.id, [orderItem2]);
    await orderRepository.create(order2);


    const orders = await orderRepository.findAll();

    expect(orders).toHaveLength(2);
    expect(orders[0]).toStrictEqual(order1);
    expect(orders[1]).toStrictEqual(order2);
  })

  it("should throw error when orders not found", async () => {
    const orderRepository = new OrderRepository();
    await expect(orderRepository.findAll()).rejects.toThrowError("Orders not found");
  })

});