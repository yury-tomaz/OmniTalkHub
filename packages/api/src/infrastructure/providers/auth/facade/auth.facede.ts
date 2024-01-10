import { AuthFacadeInterface } from "./auth.facade.interface";
import { AuthClientServiceInputDTO, AuthClientServiceOutputDTO } from "../services/auth-code/auth-code.service";
import UseCaseInterface from "@/modules/@shared/usecase/use-case.interface";
import { GetClientServiceInputDTO, GetClientServiceOutputDTO } from "../services/get-clients/get-clients.service";
import { CreateUserInputDTO } from "../services/create-user/create-user.service";

interface UseCaseProps {
 getAccessTokenService: UseCaseInterface;
 getClientService: UseCaseInterface;
 createRealmService: UseCaseInterface;
 createClientService: UseCaseInterface;
 createUserService: UseCaseInterface;
}

export class AuthFacede implements AuthFacadeInterface {
    private __getAccessTokenService: UseCaseInterface;
    private __getClientService: UseCaseInterface;
    private __createRealmService: UseCaseInterface;
    private __createClientService: UseCaseInterface;
    private __createUser: UseCaseInterface;

    constructor(props: UseCaseProps) {
        this.__getAccessTokenService = props.getAccessTokenService;
        this.__getClientService = props.getClientService;
        this.__createRealmService = props.createRealmService;
        this.__createClientService = props.createClientService;
        this.__createUser = props.createUserService;
    }

    async getAccessToken(input: AuthClientServiceInputDTO): Promise<AuthClientServiceOutputDTO> {
        return await this.__getAccessTokenService.execute(input);
    }

    async getClient(input: GetClientServiceInputDTO): Promise<GetClientServiceOutputDTO> {
        return await this.__getClientService.execute(input);
    }

    async createRealm(realm: string): Promise<any> {
        await this.__createRealmService.execute(realm);
    }

    async createClient(realm: string): Promise<any> {
        await this.__createClientService.execute(realm);
    }

    async createUser(input: CreateUserInputDTO): Promise<any> {
        await this.__createUser.execute(input);
    }
}