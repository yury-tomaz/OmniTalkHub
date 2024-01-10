
import { logger } from '@/infrastructure/logger';
import { Baileys } from '@/infrastructure/services/baileys/baileys';
import sem from 'semaphore';

export class WhatsappRepositoryInMemory {
    private static instance: WhatsappRepositoryInMemory | undefined;
    private repository: Map<string, Baileys> = new Map();
    private semaphore = sem(1);

    private constructor() { }

 static getInstance(): WhatsappRepositoryInMemory {
  if (!this.instance) {
   this.instance = new WhatsappRepositoryInMemory();
  }

  return this.instance;
 }

 async create(whatsapp: Baileys): Promise<void> {

  this.semaphore.take(async () => {

   if (await this.exists(whatsapp.key)) {
    logger.warn(`Whatsapp instance ${whatsapp.key} already exists. Updating...`);
    this.update(whatsapp);
    this.semaphore.leave();
    return;
   }

   this.repository.set(whatsapp.key, whatsapp);
   this.semaphore.leave();
  });
 }

 async find(key: string): Promise<Baileys | undefined> {
  return this.repository.get(key);
 }

 async update(whatsapp: Baileys): Promise<void> {
  this.semaphore.take(async () => {
   this.repository.set(whatsapp.key, whatsapp);
   this.semaphore.leave();
  });
 }

 async delete(key: string): Promise<void> {
  this.semaphore.take(async () => {
   this.repository.delete(key);
   this.semaphore.leave();
  });
 }

 async list(): Promise<Baileys[]> {
  return Array.from(this.repository.values());
 }

 async count(): Promise<number> {
  return this.repository.size;
 } 

 async exists(key: string): Promise<boolean> {
  return this.repository.has(key);
 }
}