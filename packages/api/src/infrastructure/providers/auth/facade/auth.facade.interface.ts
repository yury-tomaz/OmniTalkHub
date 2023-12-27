import { AuthClientServiceInputDTO, AuthClientServiceOutputDTO } from "../services/auth-code/auth-code.service";
import { GetClientServiceInputDTO, GetClientServiceOutputDTO } from "../services/get-clients/get-clients.service";


export interface AuthFacadeInterface {
 getAccessToken(input: AuthClientServiceInputDTO): Promise<AuthClientServiceOutputDTO>;
 getClient(input:GetClientServiceInputDTO): Promise<GetClientServiceOutputDTO>;
}