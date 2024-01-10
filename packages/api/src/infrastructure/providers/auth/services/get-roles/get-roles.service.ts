import { AxiosInstance } from "axios"
import { AuthClientService } from "../auth-client/auth-client.service";

interface GetRolesServiceInputDTO {
    realm: string;
    search?: string;
    first?: number;
}


export class GetRolesService{
    constructor(
            private readonly apiKeycloak: AxiosInstance,
            private readonly authClientService: AuthClientService
    ){}

    async execute(input:GetRolesServiceInputDTO){
        const { access_token } = await this.authClientService.execute();
        const endpoint = `/admin/realms/${input.realm}/roles`;
        
        const response = await this.apiKeycloak.get(endpoint, {
            params:{
                search: input.search?? null,
                first: input.first?? null,
            },
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data; 
    }
}