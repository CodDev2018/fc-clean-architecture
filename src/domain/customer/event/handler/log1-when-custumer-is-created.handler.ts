import EventHandlerInterface from "../../../@shared/events/event-handler.interface";

export default class Log1WhenCustomerIsCreatedHandler implements EventHandlerInterface {
  handle(event: any): void {
    console.log('Esse é o primeiro console.log do evento: CustomerCreated');
  }
}