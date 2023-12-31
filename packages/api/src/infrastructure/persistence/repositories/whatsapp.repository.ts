
import { WhatsappRepositoryInterface } from '@/modules/whatsapp/domain/repository/whatsapp.repository.interface';
import { Whatsapp } from "@/modules/whatsapp/domain/whatsapp.entity";
import { PrismaClientManager } from '@/infrastructure/services/prisma-client-manager';
import { logger } from '@/infrastructure/logger';
import { PrismaClient } from '@prisma/client';

export class WhatsappRepository implements WhatsappRepositoryInterface {
 private prisma: PrismaClient;

 constructor(tenantId?: string) {
  this.prisma = PrismaClientManager.getInstance().getClient(tenantId || 'public')!;
 }

 async create(entity: Whatsapp): Promise<void> {
  try {
   await this.prisma.whatsapp.create({
    data: {
     name: entity.name,
     webhookUrl: entity.webhookUrl,
     allowWebhook: entity.allowWebhook,
     heardEvents: entity.heardEvents,
     chats: entity.chats,
    }
   })
  } catch (error) {
   logger.error(error)
   await this.prisma.$disconnect()
   process.exit(1)
  }
 }

 async find(id: string): Promise<Whatsapp> {
  try {
   const whatsapp = await this.prisma.whatsapp.findUnique({
    where: {
     id: id
    }
   })
   return this.instanciateWhatsapp(whatsapp)
  } catch (error) {
   logger.error(error)
   await this.prisma.$disconnect()
   process.exit(1)
  }
 }

 async findAll(): Promise<Whatsapp[]> {
  try {
   const whatsapp = await this.prisma.whatsapp.findMany();
   return whatsapp.map((whatsapp: any) => this.instanciateWhatsapp(whatsapp));
  } catch (error) {
   logger.error(error)
   await this.prisma.$disconnect()
   process.exit(1)
  }
 }

 async update(entity: Whatsapp): Promise<void> {
  try {
   await this.prisma.whatsapp.update({
    where: {
     id: entity.id.id
    },
    data: {
     name: entity.name,
     webhookUrl: entity.webhookUrl,
     allowWebhook: entity.allowWebhook,
     heardEvents: entity.heardEvents,
     chats: entity.chats,
    }
   })
  } catch (error) {
   logger.error(error)
   await this.prisma.$disconnect()
   process.exit(1)
  }
 }

async exists(id: string): Promise<boolean> {
    try {
        const whatsapp = await this.prisma.whatsapp.findUnique({
            where: {
            id: id
            }
        })
        return whatsapp ? true : false
    } catch (error) {
        logger.error(error)
        await this.prisma.$disconnect()
        process.exit(1)
    }
    
}

 private instanciateWhatsapp(whatsapp: any): Whatsapp {
  return new Whatsapp({
    id: whatsapp.id,
    tenantId: whatsapp.tenantId,
    name: whatsapp.name,
    webhookUrl: whatsapp.webhookUrl,
    allowWebhook: whatsapp.allowWebhook,
    heardEvents: whatsapp.heardEvents,
    chats: whatsapp.chats,
  })
 }
}