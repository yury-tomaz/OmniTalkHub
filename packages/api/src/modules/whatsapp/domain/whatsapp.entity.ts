import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import Id from "../../@shared/domain/value-object/id.value-object";
import { WhatsappYupValidator } from "./validator/whatsapp.yup.validator";
import NotificationError from "../../@shared/notification/notification.error";

interface WhatsappProps {
  id?: Id;
  tenantId: Id;
  name: string;
  webhookUrl: string;
  allowWebhook: boolean;
  heardEvents: string[];
  chats?: any[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class Whatsapp extends BaseEntity implements AggregateRoot{
  private _name: string;
  private _tenantId: Id;
  private _chats: any[] = [];
  private _webhookUrl: string;
  private _allowWebhook: boolean;
  private _heardEvents: string[] ;

  constructor(props: WhatsappProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._webhookUrl = props.webhookUrl;
    this._allowWebhook = props.allowWebhook?? false;
    this._heardEvents = props.heardEvents;
    this._chats = props.chats?? [];
    this._tenantId = props.tenantId;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate(): void {
   new  WhatsappYupValidator().validate(this);
  }

  get webhookUrl(): string {
    return this._webhookUrl;
  }

  get allowWebhook(): boolean {
    return this._allowWebhook;
  }

  get heardEvents(): string[] {
    return this._heardEvents;
  }

  set heardEvents(value: string[]) {
    this._heardEvents = value;
  }

  get chats(): any[] {
    return this._chats;
  }

  set chats(value: any[]) {
    this._chats = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
    this.validate();
  }

  get tenantId(): Id {
    return this._tenantId;
  }

  set tenantId(value: Id) {
    this._tenantId = value;
  }

  toPrimitives(): Record<string, unknown> {
    return {
      id: this.id.id,
      tenantId: this.tenantId.id,
      name: this.name,
      webhookUrl: this.webhookUrl,
      allowWebhook: this.allowWebhook,
      heardEvents: this.heardEvents,
      chats: this.chats,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

}