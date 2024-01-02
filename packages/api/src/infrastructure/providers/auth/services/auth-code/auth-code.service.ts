import { AxiosInstance } from "axios";
import { GetClientService } from "../get-clients/get-clients.service";

export interface AuthClientServiceInputDTO {
 realm: string
 client_id: string;
 code: string;
}

export interface AuthClientServiceOutputDTO {
 access_token: string;
 expires_in: number;
 refresh_expires_in: number;
 refresh_token: string;
 token_type: string;
 not_before_policy: number;
 session_state: string;
 scope: string;
}

export class AuthCodeService {
 constructor(
  private readonly apiKeycloak: AxiosInstance,
  private readonly getClientService: GetClientService,
 ) { }

  public async execute(input: AuthClientServiceInputDTO): Promise<AuthClientServiceOutputDTO> {


    const endpoint = `/realms/${input.realm}/protocol/openid-connect/token`;
    
   
      const client = await this.getClientService.execute({
        client_id: input.client_id,
        realm: input.realm
      });
        const response = await this.apiKeycloak.post(endpoint, {
          grant_type: 'authorization_code',
          client_id: input.client_id,
          code: input.code,
          redirect_uri: `http://localhost:3001/callback`,
          client_secret: client.secret
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
      
        })

        return response.data;
     
   
   
 }
}