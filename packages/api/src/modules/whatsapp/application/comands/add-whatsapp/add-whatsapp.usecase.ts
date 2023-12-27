
import { WhatsappFactoryServiceInterface } from "../../../abstractions/whatsapp.service.interface";
import { AddWhatsappDto } from "./add-whatsapp.dto";
import { WhatsappAddedEvent } from "../../events/whatsapp-added.event";
import { Baileys } from "../../../../../infrastructure/services/baileys/baileys";
import { Whatsapp } from "../../../domain/whatsapp.entity";
import EventDispatcherInterface from "@/modules/@shared/domain/events/event-dispatcher.interface";

export class AddWhatsappUseCase {
  constructor(
    private readonly whatsappService: WhatsappFactoryServiceInterface<Baileys>,
    private readonly eventDispatcher: EventDispatcherInterface,
    private readonly event: typeof WhatsappAddedEvent
  ) { }

  async execute(input: AddWhatsappDto) {
    const props = {
      tenantId: input.tenantId,
      name: input.name,
      webhookUrl:  input.webhookUrl,
      allowWebhook: input.allowWebhook,
      heardEvents: input.heardEvents
    }

    const whatsapp = new Whatsapp(props);
    this.whatsappService.create(whatsapp);

    this.eventDispatcher.notify(new this.event(props));
  }

}


