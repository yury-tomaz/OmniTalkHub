import makeWASocket, {
  AuthenticationState,
  proto,
  SocketConfig,
  useMultiFileAuthState,
  WABrowserDescription,
} from "@whiskeysockets/baileys";
import { logger } from "../../logger";
import { EventHandler } from "./handlers/event.handler";

interface CustomSocketConfig extends Partial<SocketConfig> {
  auth: AuthenticationState;
  browser: WABrowserDescription;
  logger: any;
}

export interface BaileysInputDto {
  key: string;
  name: string;
  tenantId: string;
  webhookUrl: string;
  allowWebhook: boolean;
  eventHandler: EventHandler;
  heardEvents: string[];
}

export class Baileys {
  private readonly _key: string;
  private _name: string;
  private _tenantId: string;
  private qrCode: string | undefined;
  private _qrRetry: number = 0;
  private _socket: ReturnType<typeof makeWASocket> | undefined;
  private _chats: any[] = [];
  private _webhookUrl: string;
  private _allowWebhook: boolean = false;
  private _heardEvents: string[] = ['all'];
  private _messages: proto.IWebMessageInfo[] = [];
  private _isOn: boolean = false;
  private readonly _eventHandler: EventHandler;

  constructor(input: BaileysInputDto) {
    this._key = `${input.key}`;
    this._name = input.name;
    this._eventHandler = input.eventHandler;
    this._heardEvents = input.heardEvents;
    this._allowWebhook = input.allowWebhook;
    this._webhookUrl = input.webhookUrl;
    this._tenantId = input.tenantId;

    this.start().then(
      () => logger.info('Baileys instance initialized'),
      (error) => logger.error('Error initializing baileys instance', error)
    );
  }

  async start() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

    const socketConfig: CustomSocketConfig = {
      defaultQueryTimeoutMs: 60000,
      printQRInTerminal: true,
      logger: logger,
      auth: state,
      browser: ['Whatsapp MD', 'Chrome', '4.0.0'] as WABrowserDescription,
    };

    this._socket = makeWASocket(socketConfig);

    if (!this._socket) {
      logger.error('Error initializing socket');
      return;
    }

    this._socket.ev.on('creds.update', () => {
      saveCreds();
    });

    await this._eventHandler.handle(this);
  }

  get key(): string {
    return this._key;
  }

  get qr(): string | undefined {
    return this.qrCode;
  }

  set qr(value: string) {
    this.qrCode = value;
  }

  get socket(): ReturnType<typeof makeWASocket> | undefined {
    return this._socket;
  }

  get chats(): any[] {
    return this._chats;
  }

  set chats(chats: any[]) {
    this._chats = chats;
  }

  get heardEvents(): string[] {
    return this._heardEvents;
  }

  set heardEvents(value: string[]) {
    this._heardEvents = value;
  }

  get messages(): proto.IWebMessageInfo[] {
    return this._messages;
  }

  set messages(value: proto.IWebMessageInfo[]) {
    this._messages = value;
  }

  get isOn(): boolean {
    return this._isOn;
  }

  set isOn(value: boolean) {
    this._isOn = value;
  }

  get webhookUrl(): string {
    return this._webhookUrl;
  }

  set webhookUrl(value: string) {
    this._webhookUrl = value;
  }

  get allowWebhook(): boolean {
    return this._allowWebhook;
  }

  set allowWebhook(value: boolean) {
    this._allowWebhook = value;
  }

  get qrRetry(): number {
    return this._qrRetry;
  }

  sumQrRetry() {
    this._qrRetry++;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get tenantId(): string {
    return this._tenantId;
  }

  set tenantId(value: string) {
    this._tenantId = value;
  }
}