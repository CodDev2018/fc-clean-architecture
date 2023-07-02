import express from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRouter = express.Router();

productRouter.post("/", async (req, res) => {
  const useCase = new CreateProductUseCase(new ProductRepository());

  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price,
      type: req.body.type,
    };

    const output = await useCase.execute(productDto);
    res.status(201).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRouter.get("/", async (req, res) => {
  const useCase = new ListProductUseCase(new ProductRepository());

  try {
    const output = await useCase.execute({});
    res.status(200).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
