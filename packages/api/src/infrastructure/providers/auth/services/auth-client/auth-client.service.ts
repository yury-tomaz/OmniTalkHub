
import env from "@/infrastructure/config/env";
import { AppError, HttpCode } from "@/modules/@shared/domain/exceptions/app-error";
import { AxiosInstance } from "axios";

export class AuthClientService {
 constructor(
  private readonly apiKeycloak: AxiosInstance
 ) { }

 public async execute() {
  const endpoint = `/realms/master/protocol/openid-connect/token`;

  const formData = new URLSearchParams();

  formData.append("grant_type", "client_credentials");
  formData.append("client_id", "express");
  formData.append("client_secret", "yYGjBwxybGOJFTpkOiskIshHut0KqMpJ");

  try {
   const response = await this.apiKeycloak.post(endpoint, formData);

   return response.data;
  } catch (err: any) {
   throw new AppError({
    message: 'Error getting client access token from keycloak',
    statusCode: HttpCode['INTERNAL_SERVER_ERROR'],
    isOperational: false,
    error: err
   })
  }
 }
}