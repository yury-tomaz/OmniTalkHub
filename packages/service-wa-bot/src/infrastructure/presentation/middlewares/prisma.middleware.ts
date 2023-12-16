import { PrismaClientManager } from "../../services/prisma-client-manager";
import { NextFunction, Response } from "express";
import { RequestWithTenant } from "./@types";
import { AppError, HttpCode } from "../../../modules/@shared/domain/exceptions/app-error";

const prismaClientManager = PrismaClientManager.getInstance();

export function prismaMiddleware(req: RequestWithTenant, res: Response, next: NextFunction) {
  const tenant =   req.headers['x-tenant-id'] as string;

  if (!tenant) {
    throw new AppError({
      statusCode: HttpCode['BAD_REQUEST'],
      message: 'Missing tenant id',
      isOperational: true
    });
  }

  const prismaClient = prismaClientManager.getClient(tenant);

  if (!prismaClient) {
    return res.status(500).send('Error creating PrismaClient');
  }

  req['prisma'] = prismaClient as any;
  req['tenant'] = tenant;
  next();

}