import { WhatsappServiceInterface } from "../../@shared/application/abstraction/whatsapp-service-interface";

export interface WhatsappInstancesGateway {
  add(whatsapp: WhatsappServiceInterface): Promise<void>;
  find(key: string): Promise<WhatsappServiceInterface | undefined>;
  findAll(tenantId: string): Promise<WhatsappServiceInterface[]>;
  update(whatsapp: WhatsappServiceInterface): Promise<void>;
  delete(key: string): Promise<void>;
}