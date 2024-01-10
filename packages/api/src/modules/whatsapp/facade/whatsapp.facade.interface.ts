import { AddWhatsappDto } from "../application/comands/add-whatsapp/add-whatsapp.dto";
import { GetQrcodeUseCaseInputDTO } from "../application/queries/get-qrcode/get-qrcode.usecase";
import { Whatsapp } from "../domain/whatsapp.entity";

export interface WhatsappFacadeInterface{
  add(input:AddWhatsappDto): Promise<Whatsapp>;
  getQrcode(input: GetQrcodeUseCaseInputDTO): Promise<string>;
}