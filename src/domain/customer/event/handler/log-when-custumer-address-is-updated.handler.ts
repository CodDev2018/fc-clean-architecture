import EventHandlerInterface from "../../../@shared/events/event-handler.interface";

export default class LogWhenCustomerAddressUpdatedHandler implements EventHandlerInterface {
  handle(event: any): void {
    const {id, name, address } = event.eventData;
    const {street, number, city} = address;
    console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${street}, ${number}, ${city}.`);
  }
}