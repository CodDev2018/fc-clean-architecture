import Order from './order';
import OrderItem from './order_item';
describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      new Order("1", "", []);
    }).toThrowError("CustomerId is required");
  });

  it("should throw error when items is empty", () => {
    expect(() => {
      new Order("1", "123", []);
    }).toThrowError("Items qtd is must be greater than 0");
  });

  it("should return total", () => {
    const item1 = new OrderItem("1", "p1", "Item 1", 10, 2);
    const item2 = new OrderItem("2", "p2", "Item 2", 20, 2);
    const order = new Order("1", "123", [item1, item2]);
    expect(order.total).toBe(60);
  });
});