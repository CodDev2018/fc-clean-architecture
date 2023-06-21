import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      street: entity.address.street,
      number: entity.address.number,
      city: entity.address.city,
      zipCode: entity.address.zip,
      active: entity.active,
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        email: entity.email,
        street: entity.address.street,
        number: entity.address.number,
        city: entity.address.city,
        zipCode: entity.address.zip,
        active: entity.active,
        rewardPoints: entity.rewardPoints,
      },
      {
        where: {
          id: entity.id,
        }
      }
    );
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: {
          id: id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }
    
    const customer = new Customer(
      customerModel?.id,
      customerModel?.name,
      customerModel?.email
    );

    const address = new Address(
      customerModel?.street,
      customerModel?.number,
      customerModel?.zipCode,
      customerModel?.city
    );
    
    customer.address = address;
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customers = await CustomerModel.findAll();

    if (!customers || customers.length === 0) {
      throw new Error("Customers not found");
    }

    return customers.map(
      (customerModel) => {
        const customer = new Customer(
          customerModel?.id,
          customerModel?.name,
          customerModel?.email
        );
        const address = new Address(
          customerModel?.street,
          customerModel?.number,
          customerModel?.zipCode,
          customerModel?.city
        );
        customer.address = address;
        return customer;
      }
    );
  }
}
