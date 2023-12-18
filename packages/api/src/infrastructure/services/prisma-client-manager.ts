import { PrismaClient } from '@prisma/client';
import { logger } from "../logger";

export class PrismaClientManager {
  private static instance: PrismaClientManager;
  private readonly prismaClient: Record<string, PrismaClient>;

  private constructor() {
    this.prismaClient = {};
  }

  public static getInstance(): PrismaClientManager {
    if (!PrismaClientManager.instance) {
      logger.info('Creating PrismaClientManager instance');
      PrismaClientManager.instance = new PrismaClientManager();
    }

    return PrismaClientManager.instance;
  }

  public getClient(tenant: string): PrismaClient | null {
    try {
      if (!this.prismaClient[tenant]) {
        const databaseUrl = process.env.DATABASE_URL!.replace('public', tenant);

        this.prismaClient[tenant] = new PrismaClient({
          datasources: {
            db: {
              url: databaseUrl,
            },
          },
        });
      }

      logger.info(`PrismaClient for tenant ${tenant} created`);
      return this.prismaClient[tenant];
    } catch (error: any) {
      logger.error(`Error creating PrismaClient for tenant ${tenant}: ${error.message}`);
      return null;
    }
  }

  public releaseClient(tenant: string): void {
    const client = this.prismaClient[tenant];

    if (client) {
      client.$disconnect();
      delete this.prismaClient[tenant];
      logger.info(`PrismaClient for tenant ${tenant} released`);
    }
  }
}
