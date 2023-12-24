import EventHandlerInterface from "../../../../@shared/domain/events/event-handler.interface";
import { WhatsappAddedEvent } from "../whatsapp-added.event";
import { BaileysFactory } from "../../../../../infrastructure/services/baileys/baileys.factory";

export class CreateBaileysInstanceWhenWhatsappAdded implements EventHandlerInterface<WhatsappAddedEvent>{
  async handle(event: WhatsappAddedEvent): Promise<void> {
    new BaileysFactory().create({
      key: event.eventData.key,
      allowWebhook: event.eventData.allowWebhook,
      tenantId: event.eventData.tenantId,
      webhookUrl: event.eventData.webhookUrl,
      heardEvents: event.eventData.heardEvents,
    });
  }
}