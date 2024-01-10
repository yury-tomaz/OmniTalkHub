import { WhatsappFacadeInterface } from "./whatsapp.facade.interface";
import { AddWhatsappUseCase } from "../application/comands/add-whatsapp/add-whatsapp.usecase";
import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { AddWhatsappDto } from "../application/comands/add-whatsapp/add-whatsapp.dto";
import { Whatsapp } from "../domain/whatsapp.entity";
import { GetQrcodeUseCaseInputDTO } from "../application/queries/get-qrcode/get-qrcode.usecase";

export interface  UseCaseProps{
  addWhatsappUseCase: UseCaseInterface;
  getQrcodeUseCase: UseCaseInterface;
}

export class WhatsappFacade implements WhatsappFacadeInterface{
  private __addWhatsappUseCase: UseCaseInterface;
  private __getQrcodeUseCase: UseCaseInterface;

  constructor(props: UseCaseProps) {
    this.__addWhatsappUseCase = props.addWhatsappUseCase;
    this.__getQrcodeUseCase = props.getQrcodeUseCase;
  }

  async add(input: AddWhatsappDto): Promise<Whatsapp> {
    return await this.__addWhatsappUseCase.execute(input);
  }

  async getQrcode(input:GetQrcodeUseCaseInputDTO): Promise<string> {
    return await this.__getQrcodeUseCase.execute(input);
  }
}