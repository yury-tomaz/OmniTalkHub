import { WhatsappGateway } from "../../../modules/baileys/gateway/whatsapp.gateway";
import { Whatsapp } from "../../../modules/baileys/domain/baileys-instance.entity";


export class WhatsappRepository implements WhatsappGateway{
  private baileysInstances: Whatsapp[] = [];

  public async add(whatsapp: Whatsapp): Promise<void> {
    const alreadyExists = this.baileysInstances.find(instance => instance.key === whatsapp.key);
    if (alreadyExists?.socket) {
      throw new Error('Baileys instance already exists');
    }
    this.baileysInstances.push(whatsapp);
  }

  public async find(key: string): Promise<Whatsapp> {
    const instance = this.baileysInstances
      .find(instance => instance.key.id === key);
    if (!instance) {
      throw new Error('Baileys instance not found');
    }
    return instance;
  }

  public async getAll(): Promise<Whatsapp[]> {
    return this.baileysInstances;
  }

  public async findAll(tenantId: string): Promise<Whatsapp[]> {
    return this.baileysInstances.filter(instance => instance.tenantId.id === tenantId);
  }

  public async update(whatsapp: Whatsapp): Promise<void> {
    const instance = this.baileysInstances.find(instance => instance.key === whatsapp.key);
    if (!instance) {
      throw new Error('Baileys instance not found');
    }
    this.baileysInstances = this.baileysInstances.map(instance => instance.key === whatsapp.key ? whatsapp : instance);
  }

  public async delete(key: string): Promise<void> {
    const instance = this.baileysInstances.find(instance => instance.key.id === key);
    if (!instance) {
      throw new Error('Baileys instance not found');
    }
    this.baileysInstances = this.baileysInstances
      .filter(instance => instance.key.id !== key);
  }

}