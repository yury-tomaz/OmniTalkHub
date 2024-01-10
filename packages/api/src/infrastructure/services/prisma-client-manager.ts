import { PrismaClient, } from "@prisma/client";
import { logger } from "../logger";
import {Client} from 'pg';


export class PrismaClientManager {
  private static instance: PrismaClientManager;
  private readonly prismaClient: Record<string, PrismaClient>;

  private constructor() {
    this.prismaClient = {};
  }

  public static getInstance(): PrismaClientManager{
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
          log: ['query'],
          datasources: {
            db: {
              url: databaseUrl,
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
        const client = new Client({
          connectionString: databaseUrl,
        });

        await client.connect();

        const schemaTablesQuery = await client.query(`
          SELECT table_name
          FROM information_schema.tables
          WHERE table_schema = 'tenant_template';
        `);

        const schemaTables: { table_name: string }[] = schemaTablesQuery.rows;

        try {
          const createSchemaQuery = `CREATE SCHEMA IF NOT EXISTS "${tenant}"`;
          await client.query(createSchemaQuery);

          for (const table of schemaTables) {
            try {
              const tableName = table.table_name;
              const createTableQuery = `CREATE TABLE IF NOT EXISTS "${tenant}"."${tableName}" ()`;
              const result = await client.query(createTableQuery);
              logger.info(`result ${result.rowCount}`);
            } catch (err) {
              logger.error(err);
              throw err;
            }
          }
        } catch (err) {
          logger.error(err);
          throw err;
        }

        await client.end();

        this.prismaClient[tenant] = new PrismaClient({
          log: ['query'],
          datasources: {
            db: {
              url: databaseUrl,
            },
          }, 
        });


        logger.info(`PostgreSQL Client for tenant ${tenant} created`);
      }
    } catch (error: any) {
      logger.error(`Error creating PostgreSQL Client for tenant ${tenant}: ${error.message}`);
      throw error;
    }
  }
}
