import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "./product/handler/send-email-when-product-is-created.hander";
import ProductCreatedEvent from "./product/product-created.event";
import Log1WhenCustomerIsCreatedHandler from "./customer/handler/log1-when-custumer-is-created.handler";
import Log2WhenCustomerIsCreatedHandler from "./customer/handler/log2-when-custumer-is-created.handler";
import CustomerCreatedEvent from "./customer/customer-created.event";
import Address from "../../entity/address";
import LogWhenCustomerAddressUpdatedHandler from './customer/handler/log-when-custumer-address-is-updated.handler';
import CustomerAddressUpdatedEvent from './customer/customer-address-updated.event';
describe("Domain Event tests", () => {
  it("should register event hadler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toBe(
      eventHandler
    );
  });

  it("should unregister event hadler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toBe(
      eventHandler
    );

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event hadler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toBe(
      eventHandler
    );

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event hadlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toBe(
      eventHandler
    );

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalledWith(productCreatedEvent);
  });

  it("should notify customers handlers when customer is created", () => {
    const eventDispatcher = new EventDispatcher();

    const log1Handler = new Log1WhenCustomerIsCreatedHandler();
    const log2Handler = new Log2WhenCustomerIsCreatedHandler();

    const spyLog1Handler = jest.spyOn(log1Handler, "handle");
    const spyLog2Handler = jest.spyOn(log2Handler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", log1Handler);
    eventDispatcher.register("CustomerCreatedEvent", log2Handler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 1",
      email: "curtomer@email.com"
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyLog1Handler).toHaveBeenCalledWith(customerCreatedEvent);
    expect(spyLog2Handler).toHaveBeenCalledWith(customerCreatedEvent);
  });

  it("should notify customers handlers when customer address is updated", () => {
    const eventDispatcher = new EventDispatcher();

    const logHandler = new LogWhenCustomerAddressUpdatedHandler();

    const spyLogHandler = jest.spyOn(logHandler, "handle");

    eventDispatcher.register("CustomerAddressUpdatedEvent", logHandler);

    const customerAddressUpdatedEvent = new CustomerAddressUpdatedEvent({
      id: 1,
      name: "José da Silva",
      address: new Address("R. Dom Pedro I", 10, "Campo Grande", "12345678")      
    });

    eventDispatcher.notify(customerAddressUpdatedEvent);

    expect(spyLogHandler).toHaveBeenCalledWith(customerAddressUpdatedEvent);
  })
});
