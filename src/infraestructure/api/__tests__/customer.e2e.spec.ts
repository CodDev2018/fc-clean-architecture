import { app, sequelize } from "../express";
import request from "supertest";

describe("Customer API e2e tests", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        email: "john@email.com",
        address: {
          street: "Main Street",
          number: 123,
          city: "New York",
          zip: "123456",
        },
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("John Doe");
    expect(response.body.email).toBe("john@email.com");
    expect(response.body.address.street).toBe("Main Street");
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.city).toBe("New York");
    expect(response.body.address.zip).toBe("123456");
  });

  it("should not create a customer with invalid data", async () => {
    const response = await request(app).post("/customer").send({
      name: "John Doe",
    });

    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        email: "john@email.com",
        address: {
          street: "Main Street",
          number: 123,
          city: "New York",
          zip: "123456",
        },
      });

    const response2 = await request(app)
      .post("/customer")
      .send({
        name: "Jane Doe",
        email: "jane@email.com",
        address: {
          street: "Main Street",
          number: 123,
          city: "New York",
          zip: "123456",
        },
      });

    const response3 = await request(app).get("/customer");

    expect(response3.status).toBe(200);
    expect(response3.body.customers.length).toBe(2);
    const customer1 = response3.body.customers[0];
    expect(customer1.name).toBe("John Doe");
    const customer2 = response3.body.customers[1];
    expect(customer2.name).toBe("Jane Doe");
  });
});
