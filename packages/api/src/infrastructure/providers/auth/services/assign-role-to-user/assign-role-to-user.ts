import { AxiosInstance } from "axios";
import { AuthClientService } from "../auth-client/auth-client.service";
import { GetRolesService } from "../get-roles/get-roles.service";
import { AppError, HttpCode } from "@/modules/@shared/domain/exceptions/app-error";
import { logger } from "@/infrastructure/logger";

interface AssignRoleToUserInputDTO {
    realm: string;
    userId: string;
    role: string;
}

export class AssignRoleToUser{
    constructor(
        private readonly apiKeycloak: AxiosInstance,
        private readonly authClientService: AuthClientService,
        private readonly getRolesService: GetRolesService
        
    ){}

    async execute(input: AssignRoleToUserInputDTO){
        const { access_token } = await this.authClientService.execute();
        
        const roles = await this.getRolesService.execute({
            realm: input.realm,
            first: 0,
            search: input.role,
        });

        const roleAdminExists = roles.some((role: any) => role.name === input.role);

        if(!roleAdminExists){
            throw new AppError({
                message: "the admin role must exist for all realms, contact the administrator",
                statusCode: HttpCode.INTERNAL_SERVER_ERROR,
                isOperational: true,  
            })
        }


        const endpoint = `/admin/realms/${input.realm}/users/${input.userId}/role-mappings/realm`;
        

        try{
            await this.apiKeycloak.post(endpoint, roles, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                }
            })

            logger.info(`Role ${input.role} assigned to user ${input.userId}`);
        }catch(err: any){
            logger.error(err);
        }
    }
}