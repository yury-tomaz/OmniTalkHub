import { AxiosInstance } from "axios";
import { AuthClientService } from "../auth-client/auth-client.service";
import { AssignRoleToUser } from "../assign-role-to-user/assign-role-to-user";

type RealmRoles = "admin" | "offline_access" | "uma_authorization";

export interface CreateUserInputDTO {
    email: string;
    name: string;
    realm: string;
    realmRoles?: RealmRoles[];
}


export class CreateUserService{
    constructor(
        private readonly apiKeycloak: AxiosInstance,
        private readonly authClientService: AuthClientService,
        private readonly assignRoleToUser: AssignRoleToUser
    ){}

    public async execute(input: CreateUserInputDTO): Promise<any> {
        const { access_token } = await this.authClientService.execute();
        const endpoint = `/admin/realms/${input.realm}/users`;

        const userData = {
            username: input.name,
            email: input.email,
            emailVerified: false,
            enabled: true,
            groups:[],
            requiredActions: ["UPDATE_PASSWORD"],
            credentials:[{
                type: "password",
                value: generateRandomPassword(),
                temporary: true
            }]
        }

        const response = await this.apiKeycloak.post(endpoint, userData, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        });

        const regex = /\/users\/([^\/]+)$/;
        const userId = response.headers.location.match(regex)[1];

        if(input.realmRoles){
            for(const role of input.realmRoles){
                await this.assignRoleToUser.execute({
                    realm: input.realm,
                    userId,
                    role
                })
            }
        }

        return userId;
    }
}


function generateRandomPassword() {
    return Math.random().toString(36).slice(-8);
}