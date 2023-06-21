import EventHandlerInterface from "../../event-handler.interface";
import EventInterface from "../../event.interface";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface {
  handle(event: EventInterface): void {
    console.log('Sending email to....', JSON.stringify(event));
  }
}