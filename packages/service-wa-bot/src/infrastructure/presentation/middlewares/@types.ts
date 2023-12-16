import { Request } from "express";

export interface RequestWithTenant extends Request {
  tenant: string;
  headers: {
    'x-tenant-id': string;
  };
  prisma: any;
}
