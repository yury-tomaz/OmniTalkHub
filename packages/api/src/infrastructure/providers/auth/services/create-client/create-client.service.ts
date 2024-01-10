import { AxiosInstance } from "axios";
import { AuthClientService } from "../auth-client/auth-client.service";
import env from "@/infrastructure/config/env";
import { logger } from "@/infrastructure/logger";


export class CreateClientService{
    constructor(
        private readonly apiKeycloak: AxiosInstance,
        private readonly authClientService: AuthClientService
    ){}

    async execute(realm: string){
        const { access_token } = await this.authClientService.execute();
        const endpoint = `/admin/realms/${realm}/clients`;

        const {client_creation} = env.keycloak;

        const clientData = {
            name: client_creation.client_name,
            clientId: client_creation.client_id,
            protocol: "openid-connect",
            rootUrl: client_creation.root_url,
            serviceAccountsEnabled: true,
            standardFlowEnabled: true,
            alwaysDisplayInConsole: false,
            attributes: {
                "oauth2device.authorization.grant.enabled": false,
                "oidcciba.grant.enabled": false,
                "saml_idp_initiated_sso_url_name": ""
            },
            authorizationServicesEnabled: true,
            baseUrl: "",
            description: "",
            directAccessGrantsEnabled: true,
            frontchannelLogout: true,
            implicitFlowEnabled: client_creation.implicit_flow_enabled,
            publicClient: false,
            redirectUris: client_creation.redirect_uris,
            webOrigins: client_creation.web_origins,
        }

        try{
            await this.apiKeycloak.post(endpoint, clientData, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                    'User-Agent' : env.userAgent
                }
            })
            return;
        }catch(err: any){
            logger.error(err);
        }

      
    }
}