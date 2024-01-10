import { Whatsapp } from "../domain/whatsapp.entity";

export interface WhatsappFactoryServiceInterface<T> {
  create(input: Whatsapp): T;
}