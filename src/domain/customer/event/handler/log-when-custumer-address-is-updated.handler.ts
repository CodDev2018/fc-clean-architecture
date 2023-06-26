import EventHandlerInterface from "../../../@shared/events/event-handler.interface";
import CustomerAddressUpdatedEvent from "../customer-address-updated.event";

export default class LogWhenCustomerAddressUpdatedHandler implements EventHandlerInterface {
  handle(event: CustomerAddressUpdatedEvent): void {
    const {id, name, address } = event.eventData;
    const {street, number, city} = address;
    console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${street}, ${number}, ${city}.`);
  }
}