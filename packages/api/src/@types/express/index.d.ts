declare namespace Express {
  export interface Request {
    user?: {
      id: string,
      email_verified: boolean,
      name: string,
      preferred_username: string,
      given_name: string,
      family_name: string,
      email: string,
      resource_access: {
        account: {
          roles: string[]
        }
      },
      realm_access: {
        roles: string[]
      },
      tenant: string;
    };

    prisma?: PrismaClient;

  }
}