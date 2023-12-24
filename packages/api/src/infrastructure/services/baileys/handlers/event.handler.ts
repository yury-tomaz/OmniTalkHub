import { ConnectionUpdateHandler } from "./connection-update.handler";
import { ConnectionState } from "@whiskeysockets/baileys/lib/Types/State";
import { checkWebhookAllowedEvents } from "../helpers/check-webhook-allowed-events.helper";
import { MessagesUpsertHandler } from "./messages-upsert.handler";
import { GroupMetadata, ParticipantAction } from "@whiskeysockets/baileys";

import { logger } from "../../../logger";
import { Baileys } from "../baileys";
import { Whatsapp } from "../../../../modules/whatsapp/domain/whatsapp.entity";
import {
  WhatsappRepositoryInterface
} from "../../../../modules/whatsapp/domain/repository/whatsapp.repository.interface";

interface GroupParticipantsUpdateType {
  id: string;
  participants: string[];
  action: ParticipantAction;
}

export class EventHandler {
  private baileysInstance: Baileys | undefined;

  constructor(
    private connectionUpdateHandler: ConnectionUpdateHandler,
    private messagesUpsert: MessagesUpsertHandler,
    private repository: WhatsappRepositoryInterface,
  ) {
  }

  async handle(baileysInstance: Baileys) {
    const { socket } = baileysInstance;

    if (!socket) throw new Error('Uninitialized socket');

    this.baileysInstance = baileysInstance;

    socket.ev.on('connection.update', async (update: Partial<ConnectionState>) => {
      const { connection, lastDisconnect, qr } = update;
      if (connection === 'connecting') return;

      await this.connectionUpdateHandler.handle({
        connection, lastDisconnect, qr, baileysInstance
      });
    });

    socket.ev.on('presence.update', async (json) => {
      const check: boolean = checkWebhookAllowedEvents(
        ['all', 'presence', 'presence.update'],
        this.baileysInstance?.heardEvents ?? []
      );

      if (check) {
        // TODO: send webhook
      }
    });

    socket.ev.on('messaging-history.set', async ({ chats }) => {
      baileysInstance.chats = chats.map(chat => {
        return {
          ...chat,
          messages: []
        }
      });
    });

    socket.ev.on('chats.upsert', (newChat) => {
      const chats = newChat.map((chat) => {
        return {
          ...chat,
          messages: [],
        }
      })
      baileysInstance.chats = baileysInstance.chats.concat(chats);
    });

    socket.ev.on('chats.update', (changedChats) => {
      const chats = baileysInstance.chats;

      changedChats.forEach((changedChat) => {
        const index = chats.findIndex((chat) => chat.id === changedChat.id);

        if (index !== -1) {
          const prevChat = chats[index];
          chats[index] = {
            ...prevChat,
            ...changedChat,
          };
        }
      });

      baileysInstance.chats = chats;
    });

    socket.ev.on('chats.delete', (deletedChats) => {
      const chats = baileysInstance.chats;
      deletedChats.forEach((chat) => {
        const index = chats.findIndex(
          (c: any) => c.id === chat
        )
        if (index !== -1) chats.splice(index, 1);

        baileysInstance.chats = chats;
      });
    });

    socket.ev.on('messages.upsert', async ({ messages, type }) => {
      await this.messagesUpsert.handle({ messages, type, baileysInstance });
    });

    socket.ev.on('messages.update', async (messages) => {
      // Debug log
    });

    socket.ws.on('CB:call', (data: any) => {
      if (data.content) {
        const contentOffer = data.content.find((e: any) => e.tag === 'offer');
        const contentTerminate = data.content.find((e: any) => e.tag === 'terminate');
        if (contentOffer) {
          const check: boolean = checkWebhookAllowedEvents(
            ['all', 'call', 'CB:call', 'call:offer'],
            this.baileysInstance?.heardEvents ?? []
          );
          if (check) {
            // TODO: send webhook
          }
        } else if (contentTerminate) {
          const check: boolean = checkWebhookAllowedEvents(
            ['all', 'call', 'CB:call', 'call:terminate'],
            this.baileysInstance?.heardEvents ?? []
          );
          if (check) {
            // TODO: send webhook
          }
        }
      }
    });

    socket.ev.on('groups.upsert', async (newChat: GroupMetadata[]) => {
      await this.createGroupByApp(newChat);

      const check: boolean = checkWebhookAllowedEvents(
        ['all', 'groups', 'groups.upsert'],
        this.baileysInstance?.heardEvents ?? []
      );

      if (check) {
        //  TODO: send webhook
      }
    });

    socket.ev.on('groups.update', async (newChat) => {
      await this.updateGroupSubjectByApp(newChat)
    });

    socket.ev.on('group-participants.update', async (newChat) => {
      await this.updateGroupParticipantsByApp(newChat)
    });


  }

  private async updateGroupParticipantsByApp(newChat: GroupParticipantsUpdateType) {
    if (!this.baileysInstance) return;
    const key = this.baileysInstance.key;

    if (!key) throw new Error('Uninitialized key');

    try {
      if (newChat && newChat.id) {
        const response = await this.repository.find(key);
        if (!response) return;
        let chat = response.chats;

        const index = chat.find((c: any) => c.id === newChat.id);

        let is_owner = false;
        if (index) {
          if (!index.participant) index.participant = [];
          if (index.participant && newChat.action == 'add') {
            for (const participant of newChat.participants) {
              index.participant.push({
                id: participant,
                admin: null,
              })
            }
          }

          if (index.participant && newChat.action == 'remove') {
            for (const participant of newChat.participants) {
              // remove group if they are owner
              if (index.subjectOwner == participant) {
                is_owner = true
              }
              index.participant = index.participant.filter(
                (p: any) => p.id != participant
              )
            }
          }

          if (index.participant && newChat.action == 'demote') {
            for (const participant of newChat.participants) {
              if (
                index.participant.filter(
                  (p: any) => p.id == participant
                )[0]
              ) {
                index.participant.filter(
                  (p: any) => p.id == participant
                )[0].admin = null
              }
            }
          }

          if (index.participant && newChat.action == 'promote') {
            for (const participant of newChat.participants) {
              if (
                index.participant.filter(
                  (p: any) => p.id == participant
                )[0]
              ) {
                index.participant.filter(
                  (p: any) => p.id == participant
                )[0].admin = 'superadmin'
              }
            }
          }

          if (is_owner) {
            chat = chat.filter((c: any) => c.id !== newChat.id)
          } else {
            chat.filter((c: any) => c.id === newChat.id)[0] = chat
          }
          const output = new Whatsapp({
            id: response.id,
            tenantId: response.tenantId,
            name: response.name,
            webhookUrl: response.webhookUrl,
            allowWebhook: response.allowWebhook,
            heardEvents: response.heardEvents,
          })

          output.chats = chat;
          await this.repository.update(output);
        }
      }
    } catch (error) {
      logger.error(error)
      logger.error('Error updating document failed')
    }
  }

  private async updateGroupSubjectByApp(newChat: Partial<GroupMetadata>[]) {
    if (!this.baileysInstance) return;
    const key = this.baileysInstance.key;
    if (!key) throw new Error('Uninitialized key');

    try {
      if (newChat[0] && newChat[0].subject) {
        console.log('Updating group subject');

        const response = await this.repository.find(key);
        if (!response) return;
        let chat = response.chats

        chat.find((c: any) => c.id === newChat[0].id).name = newChat[0].subject;

        const output = new Whatsapp({
          id: response.id,
          tenantId: response.tenantId,
          name: response.name,
          webhookUrl: response.webhookUrl,
          allowWebhook: response.allowWebhook,
          heardEvents: response.heardEvents,
        })

        await this.repository.update(output);
      }
    } catch (error) {
      logger.error(error)
      logger.error('Error updating document failed')
    }
  }

  private async createGroupByApp(newChat: GroupMetadata[]) {
    if (!this.baileysInstance) return;
    const key = this.baileysInstance.key;

    if (!key) throw new Error('Uninitialized key');

    try {
      const response = await this.repository.find(key);

      if (!response) return;
      let chat = response.chats;

      logger.info('Creating group')
      if (chat) {
        let group = {
          id: newChat[0].id,
          name: newChat[0].subject,
          participant: newChat[0].participants,
          messages: [],
          creation: newChat[0].creation,
          subjectOwner: newChat[0].subjectOwner,
        }
        chat.push(group)

        const output = new Whatsapp({
          id: response.id,
          tenantId: response.tenantId,
          name: response.name,
          webhookUrl: response.webhookUrl,
          allowWebhook: response.allowWebhook,
          heardEvents: response.heardEvents,
        })

        output.chats = chat;

        await this.repository.update(output);
        logger.info('Group created')
      }
    } catch (error) {
      logger.error(error)
      logger.error('Error updating document failed')
    }
  }
}