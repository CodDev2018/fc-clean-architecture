import { v4 as uuid } from "uuid";
import Customer from "../../customer/entity/customer";
import ProductInterface from "../../product/entity/product.interface";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";

interface ItemOrderFactoryProps {
  name: string;
  productId: string;
  quantity: number;
  price: number;
}

interface OrderFactoryProps {
  customerId: string;
  items: ItemOrderFactoryProps[];
}

interface ProductOrderFactory {
  product: ProductInterface;
  quantity: number;
}

export default class OrderFactory {
  public static create(props: OrderFactoryProps): Order {
    return new Order(
      uuid(),
      props.customerId,
      props.items.map(
        (item) =>
          new OrderItem(
            uuid(),
            item.productId,
            item.name,
            item.price,
            item.quantity
          )
      )
    );
  }

  public static createWithCustomer(
    customer: Customer,
    items: ItemOrderFactoryProps[]
  ) {
    return new Order(
      uuid(),
      customer.id,
      items.map(
        (item) =>
          new OrderItem(
            uuid(),
            item.productId,
            item.name,
            item.price,
            item.quantity
          )
      )
    );
  }

  public static createWithCustomerAndProducts(
    customer: Customer,
    products: ProductOrderFactory[]
  ) {
    return new Order(
      uuid(),
      customer.id,
      products.map(
        (product) =>
          new OrderItem(
            uuid(),
            product.product.id,
            product.product.name,
            product.product.price,
            product.quantity
          )
      )
    );
  }
}
