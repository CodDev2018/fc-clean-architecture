import express, { Request, Response } from "express";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase';

export const customerRouter = express.Router();

customerRouter.post("/", async (req: Request, res: Response) => {
  const usercase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const customerDto = {
      name: req.body.name,
      email: req.body.email,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        zip: req.body.address.zip,
      },
    };

    const output = await usercase.execute(customerDto);
    res.status(201).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});


customerRouter.get("/", async (req: Request, res: Response) => {
  const useCase = new ListCustomerUseCase(new CustomerRepository());
  try {
    const customers = await useCase.execute({});
    res.status(200).send(customers);
  } catch (err) {
    res.status(500).send(err);
  }
});