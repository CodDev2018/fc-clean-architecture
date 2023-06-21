import OrderItem from "./order_item";

describe("OrderItem unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new OrderItem("", "p1", "Item 1", 10, 2);
    }).toThrowError("Id is required");
  });

  it("should throw error when productId is empty", () => {
    expect(() => {
      new OrderItem("1", "", "Item 1", 10, 2);
    }).toThrowError("ProductId is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new OrderItem("1", "p1", "", 10, 2);
    }).toThrowError("Name is required");
  });

  it("should throw error when price is empty", () => {
    expect(() => {
      new OrderItem("1", "p1", "Item 1", 0, 2);
    }).toThrowError("Price must be greater than 0");
  });

  it("should throw error when quantity is empty", () => {
    expect(() => {
      new OrderItem("1", "p1", "Item 1", 10, 0);
    }).toThrowError("Quantity must be greater than 0");
  });
});
