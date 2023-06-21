import Address from "./address";

const REGEX_EMAIL = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/s;

export default class Customer {
  private _id: string;
  private _name: string;
  private _email: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string, email: string) {
    this._id = id;
    this._name = name;
    this._email = email;
    this.validate();
  }

  validate() {
    if (this._id?.length === 0) {
      throw new Error("Id is required");
    }

    if (this._name?.length === 0) {
      throw new Error("Name is required");
    }

    if (this._email?.length === 0) {
      throw new Error("Email is required");
    }
    if (!REGEX_EMAIL.test(this._email)) {
      throw new Error("Email is invalid");
    }

    return true;
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
