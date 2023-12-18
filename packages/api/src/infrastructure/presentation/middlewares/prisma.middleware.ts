import { PrismaClientManager } from "../../services/prisma-client-manager";
import { NextFunction, Request, Response } from "express";
import { AppError, HttpCode } from "../../../modules/@shared/domain/exceptions/app-error";
import { PrismaClient } from "../../../generated/client";

const prismaClientManager = PrismaClientManager.getInstance();

export function prismaMiddleware(req: Request, res: Response, next: NextFunction) {
  const tenant =   req.headers['x-tenant-id'] as string;

  if (!tenant) {
    throw new AppError({
      message: 'header x-tenant-id is missing',
      statusCode: HttpCode['BAD_REQUEST'],
      isOperational: true,
    });
  }

  const prismaClient: PrismaClient | null = prismaClientManager.getClient(tenant);

  if (!prismaClient) {
    throw new AppError({
      message: `Error creating PrismaClient for tenant ${tenant}`,
      statusCode: HttpCode['INTERNAL_SERVER_ERROR'],
      isOperational: true,
    });
  }

  req['prisma'] = prismaClient as PrismaClient;
  next();
}