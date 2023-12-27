import { AxiosInstance, AxiosResponse } from "axios";
import { AuthClientService } from "../auth-client/auth-client.service";
import { logger } from "@/infrastructure/logger";

export interface GetClientServiceInputDTO {
 realm: string;
 client_id: string;
}
export interface GetClientServiceOutputDTO {
 id: string;
 clientId: string;
 secret: string;
}

export class GetClientService {
 constructor(
  private readonly apiKeycloak: AxiosInstance,
  private readonly authClientService: AuthClientService
 ) { }

 public async execute(input: GetClientServiceInputDTO): Promise<GetClientServiceOutputDTO | undefined> {
  const { access_token } = await this.authClientService.execute();

  const endpoint = `/admin/realms/${input.realm}/clients`;

  try {
   const response: AxiosResponse<GetClientServiceOutputDTO[]> = await this.apiKeycloak.get(endpoint,
    {
     params: {
      clientId: input.client_id
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