import { AddOrganizationUsecaseInputDTO } from "../application/comands/add-organization/add-organization.dto";

export interface OrganizationFacadeInterface {
    addOrganization(input: AddOrganizationUsecaseInputDTO): Promise<any>;
}