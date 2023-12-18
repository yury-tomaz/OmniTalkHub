import { WhatsappServiceInterface } from "../../../modules/@shared/application/abstraction/whatsapp-service-interface";
import { WhatsappInstancesGateway } from "../../../modules/baileys/gateway/whatsapp-instances.gateway";
import sem from 'semaphore';
import { logger } from "../../logger";
import { AppError, HttpCode } from "../../../modules/@shared/domain/exceptions/app-error";
import { BaileysFactory } from "../../services/baileys/baileys.factory";
import { WhatsappGateway } from "../../../modules/baileys/gateway/whatsapp.gateway";

export class WhatsappInstancesRepository implements WhatsappInstancesGateway {
  private inMemory: Map<string, WhatsappServiceInterface> = new Map();
  private semaphore = sem(1);

  constructor(
    private whatsappGateway: WhatsappGateway,
    private whatsappInstancesGateway: BaileysFactory,
  ) {
    this.recoverInstances().then(r => logger.info('Baileys instances recovered') );
  }

  async add(instance: WhatsappServiceInterface): Promise<void> {
    this.validate(instance);

    return new Promise((resolve) => {
      this.semaphore.take(async () => {
        const foundInstance = await this.find(instance.key);
        if (foundInstance) {
          this.semaphore.leave();
          throw new AppError({
            message: 'Instance already exists',
            statusCode: HttpCode['CONFLICT'],
            isOperational: true,
          });
        }
        this.inMemory.set(instance.key, instance);
        this.semaphore.leave();
        logger.info('Baileys instance initialized');
        resolve( );
      });
    });
  }

  async find(key: string): Promise<WhatsappServiceInterface | undefined> {
    return new Promise((resolve) => {
      this.semaphore.take(async () => {
        const foundInstance = this.inMemory.get(key);
        this.semaphore.leave();
        resolve(foundInstance);
      });
    });
  }

  async findAll(tenantId: string): Promise<WhatsappServiceInterface[]> {
    return new Promise((resolve) => {
      this.semaphore.take(async () => {
        const foundInstances = Array.from(this.inMemory.values())
          .filter(instance => instance.tenantId === tenantId);
        this.semaphore.leave();
        resolve(foundInstances);
      });
    });
  }

  async update(instance: WhatsappServiceInterface): Promise<void> {
    this.validate(instance);

    return new Promise((resolve) => {
      this.semaphore.take(async () => {
        this.inMemory.set(instance.key, instance);
        this.semaphore.leave();
        resolve();
      });
    });
  }

  async delete(key: string): Promise<void> {
    return new Promise((resolve) => {
      this.semaphore.take(async () => {
        this.inMemory.delete(key);
        this.semaphore.leave();
        resolve();
      });
    });
  }

  private validate(instance: WhatsappServiceInterface): void {
    if (!instance.key) {
      throw new AppError({
        message: 'Whatsapp instance key is required',
        statusCode: HttpCode['BAD_REQUEST'],
        isOperational: true,
      })
    }
    if (!instance.tenantId) {
      throw new AppError({
        message: 'Whatsapp instance tenantId is required',
        statusCode: HttpCode['BAD_REQUEST'],
        isOperational: true,
      })
    }
    if (!instance.socket) {
      throw new AppError({
        message: 'Whatsapp instance socket is required',
        statusCode: HttpCode['BAD_REQUEST'],
        isOperational: true,
      })
    }
    if (!instance.webhookUrl) {
      throw new AppError({
        message: 'Whatsapp instance webhookUrl is required',
        statusCode: HttpCode['BAD_REQUEST'],
        isOperational: true,
      })
    }
    if (instance.allowWebhook === undefined) {
      throw new AppError({
        message: 'Whatsapp instance allowWebhook is required',
        statusCode: HttpCode['BAD_REQUEST'],
        isOperational: true,
      })
    }
  }

  private async recoverInstances(): Promise<void> {
    try {
      const instances = await this.whatsappGateway.getAll()

      instances.forEach(instance => {
        const baileysInstance = this.whatsappInstancesGateway.create({
          key: instance.key.id,
          tenantId: instance.tenantId.id,
          webhookUrl: instance.webhookUrl,
          allowWebhook: instance.allowWebhook,
        });
        this.inMemory.set(instance.key.id, baileysInstance);
      })

    } catch (error: any) {
      logger.error(error.message?? 'Error recovering baileys instances');
    }
  }
}