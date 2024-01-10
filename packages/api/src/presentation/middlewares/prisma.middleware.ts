import { AppError, HttpCode } from "@/modules/@shared/domain/exceptions/app-error";
import { NextFunction, Request, Response } from "express";
import { PrismaClientManager } from "@/infrastructure/services/prisma-client-manager";
const prismaClientManager = PrismaClientManager.getInstance();

export function prismaMiddleware(req: Request, res: Response, next: NextFunction) {
  const tenant = req.headers['x-tenant-id'] as string;

  if (!tenant) {
    throw new AppError({
      message: 'header x-tenant-id is missing',
      statusCode: HttpCode['BAD_REQUEST'],
      isOperational: true,
    });
  }

  const prismaClient = prismaClientManager.getClient(tenant);

  if (!prismaClient) {
    throw new AppError({
      message: 'Error creating PrismaClient',
      statusCode: HttpCode['INTERNAL_SERVER_ERROR'],
      isOperational: false,
    });
  }

  next();
}