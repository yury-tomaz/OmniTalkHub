import { AxiosInstance, AxiosResponse } from "axios";
import { AuthClientService } from "../auth-client/auth-client.service";
import { logger } from "@/infrastructure/logger";


interface PromiseReturn {
 id: string;
 clientId: string;
 secret: string;
}

export class GetClientService {
 constructor(
  private readonly apiKeycloak: AxiosInstance,
  private readonly authClientService: AuthClientService
 ) { }

 public async execute(client_id: string) {
  const { access_token } = await this.authClientService.execute();

  const endpoint = `/admin/realms/teste/clients`;

  try {
   const response: AxiosResponse<PromiseReturn[]> = await this.apiKeycloak.get(endpoint,
    {
     params: {
      clientId: client_id
     },
     headers: {
      Authorization: `Bearer ${access_token}`
     }
    }
   );
   return response.data[0];
  } catch (err) {
   logger.error(err);
  }

 }
}