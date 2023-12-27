import { AxiosInstance } from "axios";
import { AuthClientService } from "../auth-client/auth-client.service";

interface CreateRealmServiceInputDTO {
 realm: string;
}

export class CreateRealmService {
 constructor(
  private readonly apiKeycloak: AxiosInstance,
  private readonly authClientService: AuthClientService
 ) { }

 public async execute(input: CreateRealmServiceInputDTO) {
  const { access_token } = await this.authClientService.execute();

  const endpoint = `/admin/realms`;

  const formData = new URLSearchParams();
  formData.append('realm', input.realm);
  formData.append('enabled', 'true');

  const response = await this.apiKeycloak.post(endpoint, formData,
   {
    headers: {
     Authorization: `Bearer ${access_token}`
    }
   }
  );

  return response.data;
 }
}