import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order_item.model";

type ItemDB = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  product_id: string;
  order_id: string;
};

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total,
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          product_id: item.productId,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );

    await this.persistirItems(entity);
  }

  async find(id: string): Promise<Order> {
    let orderModel: OrderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id: id,
        },
        rejectOnEmpty: true,
        include: [{ model: OrderItemModel }],
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.product_id,
            item.name,
            item.price,
            item.quantity
          )
      )
    );
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    if (!orders || orders.length === 0) {
      throw new Error("Orders not found");
    }

    return orders.map(
      (order) =>
        new Order(
          order.id,
          order.customer_id,
          order.items.map(
            (item) =>
              new OrderItem(
                item.id,
                item.product_id,
                item.name,
                item.price,
                item.quantity
              )
          )
        )
    );
  }

  private async persistirItems(entity: Order) {
    const order = await OrderModel.findByPk(entity.id, {
      include: [{ model: OrderItemModel }],
    });

    const newItems = entity.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      product_id: item.productId,
      order_id: entity.id,
    }));

    await this.remeveItems(
      order?.items.filter(
        (item) => !newItems.find((newItem) => newItem.id === item.id)
      )
    );

    await this.insertItems(
      newItems.filter(
        (item) => !order?.items.find((oldItem) => oldItem.id === item.id)
      )
    );

    await this.updateItens(
      newItems.filter((item) =>
        order?.items.find((oldItem) => oldItem.id === item.id)
      )
    );
  }

  private async updateItens(itemsToUpdate: ItemDB[]) {
    await Promise.all(
      itemsToUpdate?.map(
        async (item) =>
          await OrderItemModel.update(
            {
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              product_id: item.product_id,
              order_id: item.order_id,
            },
            {
              where: {
                id: item.id,
              },
            }
          )
      )
    );
  }

  private async insertItems(itemsToAdd: ItemDB[]) {
    await Promise.all(
      itemsToAdd?.map(async (item) => await OrderItemModel.create(item))
    );
  }

  private async remeveItems(itemsToRemove: OrderItemModel[]) {
    await Promise.all(
      itemsToRemove?.map(
        async (item) =>
          await OrderItemModel.destroy({
            where: { id: item.id },
          })
      )
    );
  }
}
