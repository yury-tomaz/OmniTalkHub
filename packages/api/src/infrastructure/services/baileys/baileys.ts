import makeWASocket, {
  AuthenticationState,
  proto,
  SocketConfig,
  useMultiFileAuthState,
  WABrowserDescription,
} from "@whiskeysockets/baileys";
import { logger } from "../../logger";
import { EventHandler } from "./handlers/event.handler";
import { WhatsappServiceInterface } from "../../../modules/@shared/application/abstraction/whatsapp-service-interface";

interface CustomSocketConfig extends Partial<SocketConfig> {
  auth: AuthenticationState;
  browser: WABrowserDescription;
  logger: any;
}

export interface BaileysInputDto {
  key: string;
  tenantId: string;
  webhookUrl: string;
  allowWebhook: boolean;
  eventHandler: EventHandler;
}

export class Baileys implements WhatsappServiceInterface {
  private readonly _key: string;
  private readonly _tenantId: string;
  private _webhookUrl: string;
  private _allowWebhook: boolean;
  private _qrCode: string | undefined;
  private _socket: ReturnType<typeof makeWASocket> | undefined;
  private _qrRetry: number = 0;
  private _messages: proto.IWebMessageInfo[] = [];
  private _chats: any[] = [];
  private _status: string | undefined;
  private eventHandler: EventHandler


  constructor(input: BaileysInputDto) {
    this._key = input.key;
    this._tenantId = input.tenantId;
    this._webhookUrl = input.webhookUrl;
    this._allowWebhook = input.allowWebhook;
    this.eventHandler = input.eventHandler;

    this.init().then(
      () => logger.info('Baileys instance initialized'),
      (error) => logger.error('Error initializing baileys instance', error)
    );
  }

  private async init() {
    const {state, saveCreds} = await useMultiFileAuthState('auth_info_baileys');
    const socketConfig: CustomSocketConfig = {
      defaultQueryTimeoutMs: 60000,
      printQRInTerminal: true,
      logger: logger,
      auth: state,
      browser: ['Whatsapp MD', 'Chrome', '4.0.0']
    }

    this._socket = makeWASocket(socketConfig)

    if (!this._socket) {
      logger.error('Error initializing socket');
      return;
    }

    this._socket.ev.on('creds.update', () => {
      saveCreds()
    });

    await this.eventHandler.handle(this);
  }

  get tenantId(): string {
    return this._tenantId;
  }

  get socket(): ReturnType<typeof makeWASocket> | undefined{
    return this._socket;
  }

  get qrCode(): string | undefined {
    return this._qrCode;
  }

  set qrCode(value: string | undefined) {
    this._qrCode = value;
  }

  get status(): string | undefined {
    return this._status;
  }

  set status(value: string | undefined) {
    this._status = value;
  }

  get qrRetry(): number | undefined {
    return this._qrRetry;
  }

  set qrRetry(value: number) {
    this._qrRetry = value;
  }

  get chats(): any[] {
    return this._chats;
  }

  set chats(value: any[]) {
    this._chats = value;
  }

  get messages(): proto.IWebMessageInfo[] {
    return this._messages;
  }

  set messages(value: proto.IWebMessageInfo[]) {
    this._messages = value;
  }

  get key(): string {
    return this._key;
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

}