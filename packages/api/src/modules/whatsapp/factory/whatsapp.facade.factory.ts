import { WhatsappFacade } from "../facade/whatsapp.facade";
import { AddWhatsappUseCase } from "../application/comands/add-whatsapp/add-whatsapp.usecase";
import { BaileysFactory } from "../../../infrastructure/services/baileys/baileys.factory";
import { GetQrcodeUseCase } from "../application/queries/get-qrcode/get-qrcode.usecase";
import { WhatsappRepositoryInMemory } from "@/infrastructure/persistence/repositories/whatsapp-instances.repository";

export default class WhatsappFacadeFactory {
  static create(): WhatsappFacade {
    const whatsappRepositoryInMemory = WhatsappRepositoryInMemory.getInstance();
    const whatsappService = new BaileysFactory();
    const addWhatsappUseCase = new AddWhatsappUseCase(
      whatsappService,
    );

    const getQrcodeUseCase = new GetQrcodeUseCase(whatsappRepositoryInMemory)

    return new WhatsappFacade({
      addWhatsappUseCase,
      getQrcodeUseCase
    })
  }
}