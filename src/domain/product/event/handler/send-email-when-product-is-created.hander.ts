import EventHandlerInterface from "../../../@shared/events/event-handler.interface";
import EventInterface from "../../../@shared/events/event.interface";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface {
  handle(event: EventInterface): void {
    console.log('Sending email to....', JSON.stringify(event));
  }
}