import { AuthClientServiceInputDTO, AuthClientServiceOutputDTO } from "../services/auth-code/auth-code.service";



export interface AuthFacadeInterface {
 getAccessToken(input: AuthClientServiceInputDTO): Promise<AuthClientServiceOutputDTO>;
}