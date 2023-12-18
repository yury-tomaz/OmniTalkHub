import ValueObject from "./value-object.interface";
import validator from "validator";

export class Email implements ValueObject {
  private readonly _value: string;

  constructor(value: string) {
    if (!validator.isEmail(value)) {
      throw new Error("Email is invalid");
    }
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  public equals(email: Email): boolean {
    return this._value === email.value;
  }

  public domain(): string {
    return this._value.split("@")[1];
  }
}