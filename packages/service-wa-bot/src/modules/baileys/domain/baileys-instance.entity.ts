import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import Id from "../../@shared/domain/value-object/id.value-object";
import makeWASocket, { proto } from "@whiskeysockets/baileys";

interface WhatsappProps {
  id?: Id;
  key: Id;
  tenantId: Id;
  webhookUrl: string;
  allowWebhook: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Whatsapp extends BaseEntity implements AggregateRoot {
  private _key: Id;
  private readonly _tenantId: Id;
  private _socket: ReturnType<typeof makeWASocket> | undefined;
  private _messages: proto.IWebMessageInfo[] = [];
  private _chats: any[] = [];
  private _qrCode: string | undefined;
  private _webhookUrl: string;
  private _allowWebhook: boolean;
  private _qrRetry: number = 0;
  private _status: string | undefined;

  constructor(props: WhatsappProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._key = props.key;
    this._tenantId = props.tenantId;
    this._webhookUrl = props.webhookUrl;
    this._allowWebhook = props.allowWebhook;
  }

  get key(): Id {
    return this._key;
  }

  get tenantId(): Id {
    return this._tenantId;
  }

  get socket(): ReturnType<typeof makeWASocket> | undefined {
    return this._socket;
  }

  set socket(value: ReturnType<typeof makeWASocket>) {
    this._socket = value;
  }

  get qrCode(): string | undefined {
    return this._qrCode;
  }

  get webhookUrl(): string {
    return this._webhookUrl;
  }

  get allowWebhook(): boolean {
    return this._allowWebhook;
  }

  get qrRetry(): number | undefined {
    return this._qrRetry;
  }

  get status(): string | undefined {
    return this._status;
  }

  get chats(): any[] {
    return this._chats;
  }

  get messages(): proto.IWebMessageInfo[] {
    return this._messages;
  }

  set messages(value: proto.IWebMessageInfo[]) {
    this._messages = value;
  }

  set key(value: Id) {
    this._key = value;
  }

  set qrCode(value: string | undefined) {
    this._qrCode = value;
  }

  set webhookUrl(value: string) {
    this._webhookUrl = value;
  }

  set allowWebhook(value: boolean) {
    this._allowWebhook = value;
  }


  set status(value: string | undefined) {
    this._status = value;
  }

  set chats(value: any[]) {
    this._chats = value;
  }

  public someQrRetry() {
    this._qrRetry = this._qrRetry++;
  }
}