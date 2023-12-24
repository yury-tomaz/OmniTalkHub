import { AddWhatsappDto } from "../application/comands/add-whatsapp/add-whatsapp.dto";

export interface WhatsappFacadeInterface{
  add(input:AddWhatsappDto): Promise<void>;
}