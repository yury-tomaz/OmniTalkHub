import { AuthFacadeInterface } from "./auth.facade.interface";
import { AuthClientServiceInputDTO, AuthClientServiceOutputDTO } from "../services/auth-code/auth-code.service";
import UseCaseInterface from "@/modules/@shared/usecase/use-case.interface";
import { GetClientServiceInputDTO, GetClientServiceOutputDTO } from "../services/get-clients/get-clients.service";

interface UseCaseProps {
 getAccessTokenService: UseCaseInterface;
 getClientService: UseCaseInterface;
}

export class AuthFacede implements AuthFacadeInterface {
 private __getAccessTokenService: UseCaseInterface;
 private __getClientService: UseCaseInterface;

 constructor(props: UseCaseProps) {
  this.__getAccessTokenService = props.getAccessTokenService;
  this.__getClientService = props.getClientService;
 }

 async getAccessToken(input: AuthClientServiceInputDTO): Promise<AuthClientServiceOutputDTO> {
  return await this.__getAccessTokenService.execute(input);
 }

 async getClient(input: GetClientServiceInputDTO): Promise<GetClientServiceOutputDTO> {
  return await this.__getClientService.execute(input);
 }
}