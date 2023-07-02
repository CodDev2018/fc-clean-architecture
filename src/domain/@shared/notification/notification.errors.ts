import { NotificationErrorProps } from "./notification";

export default class NotificationError extends Error {
    constructor(public error: NotificationErrorProps[]) {
        super(error.map((error) => `${error.context}: ${error.message}`).join(", "));
    }
}