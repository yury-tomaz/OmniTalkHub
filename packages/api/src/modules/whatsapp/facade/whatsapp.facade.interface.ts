import { AddWhatsappDto } from "../application/comands/add-whatsapp/add-whatsapp.dto";
import { Whatsapp } from "../domain/whatsapp.entity";

export interface WhatsappFacadeInterface{
  add(input:AddWhatsappDto): Promise<Whatsapp>;
}