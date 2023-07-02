import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.errors";
import Address from "../value-object/address";

const REGEX_EMAIL = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/s;

export default class Customer extends Entity{
  private _name: string;
  private _email: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string, email: string) {
    super();
    this._id = id;
    this._name = name;
    this._email = email;
    this.validate();
  }

  validate() {
    if (this._id?.length === 0) {
      this.notification.addError({
        context: "customer",
        message:"Id is required"
      });
    }

    if (this._name?.length === 0) {
      this.notification.addError({
        context: "customer",
        message:"Name is required"
      });
    }

    if (this._email?.length === 0) {
      this.notification.addError({
        context: "customer",
        message:"Email is required"
      });
    } else if (!REGEX_EMAIL.test(this._email)) {
      this.notification.addError({
        context: "customer",
        message:"Email is invalid"
      });
    }
    
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors);
    }
  }
  
  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get active() {
    return this._active;
  }

  get rewardPoints() {
    return this._rewardPoints;
  }

  isActive(): boolean {
    return this._active;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeEmail(email: string) {
    this._email = email;
    this.validate();
  }

  set address(address: Address) {
    this._address = address;
  }

  get address() {
    return this._address;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}
