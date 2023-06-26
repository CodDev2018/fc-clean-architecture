import EventHandlerInterface from "../../../@shared/events/event-handler.interface";

export default class Log2WhenCustomerIsCreatedHandler implements EventHandlerInterface {
  handle(event: any): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated');
  }
}