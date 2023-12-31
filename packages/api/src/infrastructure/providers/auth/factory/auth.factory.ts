import { logger } from "@/infrastructure/logger";
import { apiKeycloak } from "../axios";
import { AuthFacede } from "../facade/auth.facede";
import { AuthClientService } from "../services/auth-client/auth-client.service";
import { AuthCodeService } from "../services/auth-code/auth-code.service";
import { GetClientService } from "../services/get-clients/get-clients.service";
import { CreateClientService } from "../services/create-client/create-client.service";
import { CreateRealmService } from "../services/create-reaml/create-realm.service";
import { CreateUserService } from "../services/create-user/create-user.service";
import { AssignRoleToUser } from "../services/assign-role-to-user/assign-role-to-user";
import { GetRolesService } from "../services/get-roles/get-roles.service";

export class AuthFactory{
 static create(){
    logger.info('Creating AuthProvider...');
    const authClientService = new AuthClientService(apiKeycloak);
    const getClientService = new GetClientService(apiKeycloak, authClientService);
    const getAccessTokenService = new AuthCodeService(apiKeycloak, getClientService);
    const createRealmService = new CreateRealmService(apiKeycloak, authClientService);
    const createClientService = new CreateClientService(apiKeycloak, authClientService);
    const getRolesService = new GetRolesService(apiKeycloak, authClientService);
    
    const assignRoleToUserService = new AssignRoleToUser(
        apiKeycloak,
        authClientService,
        getRolesService
    );

    const createUserService = new CreateUserService(
        apiKeycloak,
        authClientService,
        assignRoleToUserService
    );

  return new AuthFacede({
   getAccessTokenService,
   getClientService,
   createRealmService,
   createClientService,
   createUserService
  });
 }
}