import { logger } from "@/infrastructure/logger";
import { AppError, HttpCode } from "@/modules/@shared/domain/exceptions/app-error";
import Id from "@/modules/@shared/domain/value-object/id.value-object";
import { Organization } from "@/modules/organization/domain/entity/organization.entity";
import { OrganizationRepositoryInterface } from "@/modules/organization/domain/repository/organization.repository.interface";
import client from "../../client";


export class OrganizationRepository implements OrganizationRepositoryInterface {  
  
  async create(entity: Organization): Promise<void> {
    try {
      await client.organization.create({
        data: {
          id: entity.id.id,
          name: entity.name,
          realm: entity.realm,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
       }
      })

      logger.info(`Organization with id ${entity.id.id} was created`)
    } catch (error) {
      logger.error(error)
      await client.$disconnect()
      process.exit(1)
    }  
  }

  async find(id: string): Promise<Organization> {
    try {
      const organization = await client.organization.findUnique({
        where: {
          id: id
        }
      })

      if(!organization) {
        throw new AppError({
          message: 'Organization not found',
          statusCode: HttpCode['NOT_FOUND'],
          isOperational: true
        })
      }

      logger.info(`Organization with id ${id} was found`)
      return new Organization({
        id: new Id(organization.id),
        name: organization.name,
        realm: organization.realm,
        createdAt: organization.createdAt,
        updatedAt: organization.updatedAt,
      })

      
    } catch (error) {
      logger.error(error)
      await client.$disconnect()
      process.exit(1)
    }  
  }

  async findAll(): Promise<Organization[]> {
    try {
      const organizations = await client.organization.findMany();

      if(!organizations) {
        throw new AppError({
          message: 'Organizations not found',
          statusCode: HttpCode['NOT_FOUND'],
          isOperational: true
        })
      }

      logger.info(`Found ${organizations.length} organizations`)
      return organizations.map(organization => new Organization({
        id: new Id(organization.id),
        name: organization.name,
        realm: organization.realm,
        createdAt: organization.createdAt,
        updatedAt: organization.updatedAt,
      }))
    } catch (error) {
      logger.error(error)
      await client.$disconnect()
      process.exit(1)
    }
  }

  async update(entity: Organization): Promise<void> {
    try {
      await client.organization.update({
        where: {
          id: entity.id.id
        },
        data: {
          name: entity.name,
          updatedAt: entity.updatedAt,
        }
      })

      logger.info(`Organization with id ${entity.id.id} was updated`)
    } catch (error) {
      logger.error(error)
      await client.$disconnect()
      process.exit(1)
    }  
  }

  async delete(id: string): Promise<void> {
    try {
      await client.organization.delete({
        where: {
          id: id
        }
      })

      logger.info(`Organization with id ${id} was deleted`)
    } catch (error) {
      logger.error(error)
      await client.$disconnect()
      process.exit(1)
    }
  }

  async exists(realm: string): Promise<boolean> {
    try {
      const organization = await client.organization.findUnique({
        where: {
          realm: realm
        }
      })

      return !!organization
    } catch (error) {
      logger.error(error)
      await client.$disconnect()
      process.exit(1)
    }
  }
  
}