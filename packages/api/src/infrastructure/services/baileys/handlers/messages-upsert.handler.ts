import  { MessageUpsertType, proto, WAMessage } from "@whiskeysockets/baileys";
import { env } from "../../../config/env";
import { downloadMessage } from "../helpers/download-message.helper";
import { checkWebhookAllowedEvents } from "../helpers/check-webhook-allowed-events.helper";
import { Baileys } from "../baileys";

interface Props {
  messages: proto.IWebMessageInfo[];
  type: MessageUpsertType;
  baileysInstance: Baileys;
}

interface WebhookData extends WAMessage {
  instanceKey: string,
  text: WAMessage[],
  msgContent: string | undefined
}

export class MessagesUpsertHandler {
  async handle({ messages, type, baileysInstance}: Props) {
    const currentMessages = baileysInstance.messages;
    const { socket } = baileysInstance;
      if(!socket) throw new Error('Uninitialized socket');

    if (type === "append") {
      baileysInstance.messages = messages.concat(currentMessages);
    }
    if (type !== 'notify') return;

    if (env.webhookBase64) {
      const unreadMessages = messages.map(message => {
        return {
          remoteJid: message.key.remoteJid,
          id: message.key.id,
          participant: message.key.participant,

        }
      })
      await socket.readMessages(unreadMessages);
    }
    baileysInstance.messages = messages.concat(currentMessages);

    baileysInstance.messages.map(async (message) => {
      if(!message.message) return;

      const messageType =   Object.keys(message.message)[0];

      const isProtocolOrKeyDistributionMessage : boolean = ['protocolMessage', 'senderKeyDistributionMessage',].includes(messageType);
      if (isProtocolOrKeyDistributionMessage ) return;

      const webhookData = {
        ...message,
      } as WebhookData;

      if (messageType === 'conversation') {
        webhookData['text'] = messages;
      }

      if (env.webhookBase64) {
        switch (messageType) {
          case 'imageMessage':
            webhookData['msgContent'] = await downloadMessage({
              directPath: message.message.imageMessage?.directPath,
              mediaKey: message.message.imageMessage?.mediaKey,
              url: message.message.imageMessage?.url,
            }, 'image')
            break
          case 'videoMessage':
            webhookData['msgContent'] = await downloadMessage({
              directPath: message.message.videoMessage?.directPath,
              mediaKey: message.message.videoMessage?.mediaKey,
              url: message.message.videoMessage?.url,
            }, 'video')
            break
          case 'audioMessage':
            webhookData['msgContent'] = await downloadMessage({
              directPath: message.message.audioMessage?.directPath,
              mediaKey: message.message.audioMessage?.mediaKey,
              url: message.message.audioMessage?.url,
            }, 'audio')
            break
          default:
            webhookData['msgContent'] = '';
            break
        }
      }

      const isWebhookAllowedEvent : boolean = checkWebhookAllowedEvents(['all', 'message', 'message.new']);
      if (isWebhookAllowedEvent ) {
        // TODO: send webhook
      }

    });

  }
}