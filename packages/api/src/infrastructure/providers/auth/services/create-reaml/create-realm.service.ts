import { AxiosInstance } from "axios";
import { AuthClientService } from "../auth-client/auth-client.service";
import env from "@/infrastructure/config/env";
import { logger } from "@/infrastructure/logger";
import { AppError, HttpCode } from "@/modules/@shared/domain/exceptions/app-error";

interface CreateRealmServiceInputDTO {
 realm: string;
}

export class CreateRealmService {
 constructor(
  private readonly apiKeycloak: AxiosInstance,
  private readonly authClientService: AuthClientService
 ) { }

 public async execute(realm: string) {
  const { access_token } = await this.authClientService.execute();

  if(!realm) throw new AppError({
    message: 'Realm name is required',
    statusCode: HttpCode['BAD_REQUEST'],
    isOperational: true
  });

  try {
    await this.apiKeycloak.post('/admin/realms', {
      "enabled": true,
      "realm": realm,
      "roles": {
        "realm": [
          {
            "name": "admin",
            "description": "O Boss"
          }
          
        ]
      }
  },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    }
  );

  }catch (err: any) {
    logger.error(err);
  }


 } 
}