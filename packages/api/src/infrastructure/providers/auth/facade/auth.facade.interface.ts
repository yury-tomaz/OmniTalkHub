import { AuthClientServiceInputDTO, AuthClientServiceOutputDTO } from "../services/auth-code/auth-code.service";
import { CreateUserInputDTO } from "../services/create-user/create-user.service";
import { GetClientServiceInputDTO, GetClientServiceOutputDTO } from "../services/get-clients/get-clients.service";


export interface AuthFacadeInterface {
 getAccessToken(input: AuthClientServiceInputDTO): Promise<AuthClientServiceOutputDTO>;
 getClient(input:GetClientServiceInputDTO): Promise<GetClientServiceOutputDTO>;
 createRealm(realm: string): Promise<any>;
 createClient(realm: string): Promise<any>;
 createUser(input: CreateUserInputDTO): Promise<any>;
}