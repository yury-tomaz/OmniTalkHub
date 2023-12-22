import { Whatsapp } from "../domain/baileys-instance.entity";

export interface WhatsappGateway {
  add(whatsapp: Whatsapp): Promise<void>;
  find(key: string): Promise<Whatsapp>;
  findAll(tenantId: string): Promise<Whatsapp[]>;
  getAll(): Promise<Whatsapp[]>;
  update(whatsapp: Whatsapp): Promise<void>;
  delete(id: string): Promise<void>;
}