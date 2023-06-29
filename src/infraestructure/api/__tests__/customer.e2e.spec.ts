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
});
