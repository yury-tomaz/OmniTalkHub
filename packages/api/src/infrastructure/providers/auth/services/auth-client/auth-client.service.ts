
import env from "@/infrastructure/config/env";
import { AppError } from "@/modules/@shared/domain/exceptions/app-error";
import { AxiosInstance } from "axios";

export class AuthClientService {
 constructor(
  private readonly apiKeycloak: AxiosInstance
 ) { }

 public async execute() {
  const endpoint = `/realms/master/protocol/openid-connect/token`;

  const formData = new URLSearchParams();

  formData.append("grant_type", "client_credentials");
  formData.append("client_id", env.keycloak.client_id);
  formData.append("client_secret", env.keycloak.client_secret);

  try {
   const response = await this.apiKeycloak.post(endpoint, formData);
   
   return response.data;
  } catch (err: any) {
   throw new AppError({
    message: err.response.data.error_description,
    statusCode: err.response.status,
    isOperational: false,
    error: err.response.data.error
   })
  }
 }
}