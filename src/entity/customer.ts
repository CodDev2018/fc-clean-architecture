const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export default class Customer {
  _id: string;
  _name: string;
  _email: string;
  _address!: Address;
  _active: boolean = false;

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

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }
}
