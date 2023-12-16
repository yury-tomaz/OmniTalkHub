import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import Id from "../../@shared/domain/value-object/id.value-object";
import { Email } from "../../@shared/domain/value-object/email.object-value";


interface TenantProps {
  id?: Id;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Tenant extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _email: Email;

  constructor(props: TenantProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._email = new Email(props.email);
  }

  get name(): string {
    return this._name;
  }

  get email(): Email {
    return this._email;
  }

  changeName(name: string): void {
    this._name = name;
  }

  changeEmail(email: string): void {
    this._email = new Email(email);
  }
}