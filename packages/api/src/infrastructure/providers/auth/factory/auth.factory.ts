import { logger } from "@/infrastructure/logger";
import { apiKeycloak } from "../axios";
import { AuthFacede } from "../facade/auth.facede";
import { AuthClientService } from "../services/auth-client/auth-client.service";
import { AuthCodeService } from "../services/auth-code/auth-code.service";
import { GetClientService } from "../services/get-clients/get-clients.service";

export class AuthFactory{
 static create(){
  logger.info('Creating AuthProvider...');
  const authClientService = new AuthClientService(apiKeycloak);
  const getClientService = new GetClientService(apiKeycloak, authClientService);
  const authCodeService = new AuthCodeService(apiKeycloak, getClientService);

  return new AuthFacede({
   getAccessTokenService: authCodeService,
   getClientService
  });
 }
}