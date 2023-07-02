import { app, sequelize } from "../express";
import request from "supertest";
import Product from '../../../domain/product/entity/product';

describe("Product API e2e tests", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 10.0,
        type: "A"});

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(10.0);
    expect(response.body.type).toBe("A");
  });

  it("should not create a product with invalid data", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 10.0,
        type: "C"});

    expect(response.status).toBe(500);
  })

  it("should list all products", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 10.0,
        type: "A"});

    const response2 = await request(app)
      .post("/product")
      .send({
        name: "Product 2",
        price: 20.0,
        type: "B"});

    const response3 = await request(app)
      .get("/product");

    expect(response3.status).toBe(200);
    expect(response3.body.products.length).toBe(2);
    const productA = response3.body.products[0];
    expect(productA.name).toBe("Product 1");
    expect(productA.type).toBe("A");
    expect(productA.price).toBe(10.0);
    const productB = response3.body.products[1];
    expect(productB.name).toBe("Product 2");
    expect(productB.type).toBe("B");
    expect(productB.price).toBe(40.0);
  })

});