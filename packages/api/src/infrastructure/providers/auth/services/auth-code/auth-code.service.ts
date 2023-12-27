import { AxiosInstance } from "axios";
import { GetClientService } from "../get-clients/get-clients.service";
import { AppError, HttpCode } from "@/modules/@shared/domain/exceptions/app-error";

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
  const client = await this.getClientService.execute({
   client_id: input.client_id,
    realm: input.realm
  });

  if (!client) {
   throw new AppError({
    message: 'Client not found',
    statusCode: HttpCode['BAD_REQUEST'],
    isOperational: false
   })
  }

  const endpoint = `/realms/${input.realm}/protocol/openid-connect/token`;

  const formData = new URLSearchParams();

  formData.append('grant_type', 'authorization_code');
  formData.append('client_id', 'react_client');
  formData.append('client_secret', client.secret);
  formData.append('code', input.code);
  formData.append('redirect_uri', 'http://localhost:3000/callback');

  try{
   const response = await this.apiKeycloak.post(endpoint, formData)
   return response.data;
  }catch(err: any){
   throw new AppError({
    message: err.response.data.error_description,
    statusCode: err.response.status,
    isOperational: false,
    error: err.response.data.error
   })
  }


 }
}