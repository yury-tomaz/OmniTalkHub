import { PrismaClient } from "@prisma/client";
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

  public getClient(tenant: string): PrismaClient {
    try {
      if (!this.prismaClient[tenant]) {
        const databaseUrl = process.env.DATABASE_URL!.replace('public', tenant);
        this.prismaClient[tenant] = new PrismaClient({
          log: ['query'],
          datasources: {
            db: {
              url: databaseUrl,
              max: 10,
              idleTimeoutMillis: 30000,
            },
          },
        });
        logger.info(`PrismaClient for tenant ${tenant} created`);
      }

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

  public async createNewTenant(tenant: string): Promise<void> {
    try {
      if (!this.prismaClient[tenant]) {
        const databaseUrl = process.env.DATABASE_URL!.replace('public', 'tenant_template');
        const prismaTenantTemplate = new PrismaClient({
          log: ['query'],
          datasources: {
            db: {
              url: databaseUrl,
            },
          },
        });

        const schemaTables = await prismaTenantTemplate.$queryRaw(`
          SELECT table_name
          FROM information_schema.tables
          WHERE table_schema = 'tenant_template';
        `);

        await prismaTenantTemplate.$executeRaw`
          CREATE SCHEMA ${tenant};
        `;

  
        for (const table of schemaTables) {
          await prismaTenantTemplate.$executeRaw(`
            CREATE TABLE ${tenant}.${table.table_name} AS
            SELECT * FROM tenant_template.${table.table_name};
          `);
        }

        prismaTenantTemplate.$disconnect();
        
        this.prismaClient[tenant] = new PrismaClient({
          log: ['query'],
          datasources: {
            db: {
              url: process.env.DATABASE_URL!.replace('public', tenant),
              max: 10,
              idleTimeoutMillis: 30000,
            },
          },
        });

        logger.info(`PrismaClient for tenant ${tenant} created`);
      }
    } catch (error: any) {
      logger.error(`Error creating PrismaClient for tenant ${tenant}: ${error.message}`);
    }
  }
}
