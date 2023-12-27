import { AuthFacadeInterface } from "./auth.facade.interface";
import { AuthClientServiceInputDTO, AuthClientServiceOutputDTO } from "../services/auth-code/auth-code.service";
import UseCaseInterface from "@/modules/@shared/usecase/use-case.interface";

interface UseCaseProps {
 getAccessTokenService: UseCaseInterface;
}

export class AuthFacede implements AuthFacadeInterface {
 private __getAccessTokenService: UseCaseInterface;

 constructor(props: UseCaseProps) {
  this.__getAccessTokenService = props.getAccessTokenService;
 }

 async getAccessToken(input: AuthClientServiceInputDTO): Promise<AuthClientServiceOutputDTO> {
  
  return await this.__getAccessTokenService.execute(input);
 }
}