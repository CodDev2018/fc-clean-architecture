import OrderItem from "./order_item";

export default class Order {
  _id: string;
  _customerId: string;
  _items: Array<OrderItem>;
  _total: number;

  constructor(id: string, customerId: string, items: Array<OrderItem>) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this._items.reduce((total, item) => total + item.totalPrice, 0);

    this.validate();
  }

  validate() {
    if (this._id?.length === 0) {
      throw new Error("Id is required");
    }

    if (this._customerId?.length === 0) {
      throw new Error("CustomerId is required");
    }

    if (this._items?.length === 0) {
      throw new Error("Items qtd is must be greater than 0");
    }

    return true;
  }

  addItem(item: OrderItem) {
    this._items.push(item);
    this._total += item.totalPrice;
    this.validate();
  }

  get id() {
    return this._id;
  }

  get customerId() {
    return this._customerId;
  }

  get items() {
    return this._items;
  }

  get total() {
    return this._total;
  }
}
