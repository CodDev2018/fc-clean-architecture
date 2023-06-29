import express, { Request, Response } from "express";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";

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
