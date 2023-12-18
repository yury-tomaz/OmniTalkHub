declare namespace Express {
  export interface Request {
   tenant: string | null;
   prisma: PrismaClient | null;
  }
}