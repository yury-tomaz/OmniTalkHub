import { WhatsappFacade } from "../facade/whatsapp.facade";
import { AddWhatsappUseCase } from "../application/comands/add-whatsapp/add-whatsapp.usecase";
import EventDispatcher from "../../@shared/domain/events/event-dispatcher";
import { BaileysFactory } from "../../../infrastructure/services/baileys/baileys.factory";
import { WhatsappAddedEvent } from "../application/events/whatsapp-added.event";

export default class WhatsappFacadeFactory {
  static create(): WhatsappFacade {
    const whatsappService = new BaileysFactory();
    const eventDispatcher = new EventDispatcher();
    const addWhatsappUseCase = new AddWhatsappUseCase(
      whatsappService,
      eventDispatcher,
      WhatsappAddedEvent
    );

    return new WhatsappFacade({
      addWhatsappUseCase
    })
  }
}