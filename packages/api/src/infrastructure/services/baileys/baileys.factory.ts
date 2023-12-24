import { EventHandler } from "./handlers/event.handler";
import { ConnectionUpdateHandler } from "./handlers/connection-update.handler";
import { MessagesUpsertHandler } from "./handlers/messages-upsert.handler";
import { Baileys, } from "./baileys";
import { WhatsappFactoryServiceInterface } from "../../../modules/whatsapp/abstractions/whatsapp.service.interface";
import { WhatsappRepository } from "../../persistence/repositories/whatsapp.repository";
import { Whatsapp } from "../../../modules/whatsapp/domain/whatsapp.entity";

export class BaileysFactory implements WhatsappFactoryServiceInterface<Baileys>{
  create(input: Whatsapp): Baileys {
    const messagesUpsert = new MessagesUpsertHandler();
    const repository = new WhatsappRepository(input.tenantId.id);
    const connectionUpdateHandler = new ConnectionUpdateHandler(repository);

    const eventHandler = new EventHandler(
      connectionUpdateHandler,
      messagesUpsert,
      repository,
    );

    return new Baileys({
      name: input.name,
      allowWebhook: input.allowWebhook,
      key: input.id.id,
      webhookUrl: input.webhookUrl,
      tenantId: input.tenantId.id,
      heardEvents: input.heardEvents,
      eventHandler,
    });
  }
}