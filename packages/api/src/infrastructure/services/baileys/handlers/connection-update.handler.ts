import QRCode from 'qrcode';

import { Baileys } from "../baileys";
import makeWASocket, { BaileysEventMap, DisconnectReason } from "@whiskeysockets/baileys";
import { checkWebhookAllowedEvents } from "../helpers/check-webhook-allowed-events.helper";


import Id from '@/modules/@shared/domain/value-object/id.value-object';
import { logger } from '@/infrastructure/logger';
import { Whatsapp } from '@/modules/whatsapp/domain/whatsapp.entity';
import { WhatsappRepositoryInterface } from '@/modules/whatsapp/domain/repository/whatsapp.repository.interface';


interface CustomError extends Error {
  output?: {
    statusCode: number;
  };
}

interface Props {
  connection: string | undefined,
  lastDisconnect: { error: Error | undefined; date: Date } | undefined,
  qr: string | undefined,
  baileysInstance: Baileys,
}


export class ConnectionUpdateHandler {
  private baileysInstance?: Baileys;

  constructor(
    private repository: WhatsappRepositoryInterface,
  ) {
  }

  async handle({connection, lastDisconnect, qr, baileysInstance}: Props) {
    this.baileysInstance = baileysInstance;

    if (!this.baileysInstance) throw new Error('Baileys instance not initialized');

    if (connection === 'close') {
      const {error} = lastDisconnect as { error: CustomError };

      if (error.output?.statusCode !== DisconnectReason.loggedOut) {
        await this.baileysInstance.start();
      } else {
        this.baileysInstance.isOn = false;
      }

      const check: boolean = checkWebhookAllowedEvents(
        ['all', 'connection', 'connection.update', 'connection:close'],
        this.baileysInstance?.heardEvents ?? []
      );
      if (check) {
        // TODO: send webhook
      }
    } else if (connection === 'open') {
      logger.info('Connection open');

      const key = this.baileysInstance.key;

      const alreadyThere = await this.repository.find(key);

      if (!alreadyThere) {
        const whatsapp = new Whatsapp({
          id: new Id(key),
          tenantId: new Id(this.baileysInstance.tenantId),
          name: this.baileysInstance.name,
          webhookUrl: this.baileysInstance.webhookUrl,
          allowWebhook: this.baileysInstance.allowWebhook,
          heardEvents: this.baileysInstance.heardEvents
        });

        await this.repository.create(whatsapp);
      }

      this.baileysInstance.isOn = true;

      const check: boolean = checkWebhookAllowedEvents(
        ['all', 'connection', 'connection.update', 'connection:open'],
        this.baileysInstance?.heardEvents ?? []
      );

      if (check) {
        // TODO: notify 
      }
    }

    if (qr) {
      this.baileysInstance.qr = await QRCode.toDataURL(qr);
      this.baileysInstance.sumQrRetry();

      if (this.baileysInstance.qrRetry >= 3) {
        this.closeWebSocketConnection(this.baileysInstance);
      }
    }
  }

  private closeWebSocketConnection(baileysInstance: Baileys) {
    const {socket} = baileysInstance;
    if (!socket) return;

    socket.ws.close();
    this.removeAllListeners(socket);
    baileysInstance.qr = '';
    logger.info('socket connection terminated');
  }

  private removeAllListeners(sock: ReturnType<typeof makeWASocket>) {
    const events: (keyof BaileysEventMap)[] = [
      'connection.update', 'creds.update', 'messaging-history.set',
      'chats.upsert', 'chats.update', 'chats.delete', 'presence.update',
      'contacts.upsert', 'contacts.update', 'messages.delete', 'messages.update',
      'messages.media-update', 'messages.upsert', 'messages.reaction', 'message-receipt.update',
      'groups.upsert', 'groups.update', 'group-participants.update', 'blocklist.set',
      'blocklist.update', 'call', 'labels.edit', 'labels.association'
    ]
    events.forEach(event => {
      sock.ev.removeAllListeners(event);
    });
  }

}