import EventHandlerInterface from "../../../@shared/events/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class Log2WhenCustomerIsCreatedHandler implements EventHandlerInterface {
  handle(event: CustomerCreatedEvent): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated');
  }
}