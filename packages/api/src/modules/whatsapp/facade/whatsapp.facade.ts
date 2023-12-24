import { WhatsappFacadeInterface } from "./whatsapp.facade.interface";
import { AddWhatsappUseCase } from "../application/comands/add-whatsapp/add-whatsapp.usecase";
import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { AddWhatsappDto } from "../application/comands/add-whatsapp/add-whatsapp.dto";

export interface  UseCaseProps{
  addWhatsappUseCase: UseCaseInterface;
}

export class WhatsappFacade implements WhatsappFacadeInterface{
  private __addWhatsappUseCase: UseCaseInterface;

  constructor(props: UseCaseProps) {
    this.__addWhatsappUseCase = props.addWhatsappUseCase;
  }

  async add(input: AddWhatsappDto): Promise<void> {
    await this.__addWhatsappUseCase.execute(input);
  }
}