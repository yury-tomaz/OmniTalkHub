import { EventHandler } from "./handlers/event.handler";
import { ConnectionUpdateHandler } from "./handlers/connection-update.handler";
import { MessagesUpsertHandler } from "./handlers/messages-upsert.handler";
import { WhatsappRepository } from "../../persistence/repositories/whatsapp.repository";
import { Baileys, } from "./baileys";

interface BaileysInputDto {
  key: string;
  tenantId: string;
  webhookUrl: string;
  allowWebhook: boolean;
}

export class BaileysFactory {
  public create(input: BaileysInputDto): Baileys {
    const connectionUpdateHandler = new ConnectionUpdateHandler();
    const messagesUpsert = new MessagesUpsertHandler();
    const repository = new WhatsappRepository;
    const eventHandler = new EventHandler(
      connectionUpdateHandler,
      messagesUpsert,
      repository,
    );

    return new Baileys({
      ...input,
      eventHandler,
    });
  }
}