import Order from '../entity/order';
import OrderItem from '../entity/order_item';
import OrderService from './order.service';
import Customer from '../entity/customer';

describe("Order Service unit tests", () => {

  it("should get total of all orders", () => {
    const item1 = new OrderItem("i1", "p1", "Item 1", 10, 1);
    const item2 = new OrderItem("i2", "p2", "Item 2", 20, 2);

    const order1 = new Order("o1", "c1", [item1]);       
    const order2 = new Order("o2", "c2", [item1, item2]);
    
    const orders = [order1, order2];

    const total = OrderService.total(orders);

    expect(total).toEqual(order1.total + order2.total);
  })

  it("should place an order", () => {
    const customer = new Customer("c1", "Customer 1", "customer@email.com")
    const item = new OrderItem("i1", "p1", "Item 1", 10, 1);

    const order = OrderService.placeOrder(customer, [item]);

    expect(customer.rewardPoints).toEqual(order.total / 2);
  })

  it("should throw an error when placing an order with no items", () => {
    const customer = new Customer("c1", "Customer 1", "customer@email.com")
    expect(() => OrderService.placeOrder(customer, [])).toThrowError("Items are required");
  })
})