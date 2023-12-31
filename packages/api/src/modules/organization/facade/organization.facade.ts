import UseCaseInterface from "@/modules/@shared/usecase/use-case.interface";
import { OrganizationFacadeInterface } from "./organization-facade.interface";
import { AddOrganizationUsecaseInputDTO } from "../application/comands/add-organization/add-organization.dto";

interface UseCaseProps {
    addOrganization: UseCaseInterface;
}

export class OrganizationFacade implements OrganizationFacadeInterface{
    private __addOrganization: UseCaseInterface;

    constructor(props: UseCaseProps) {
        this.__addOrganization = props.addOrganization;
    }

    async addOrganization(input: AddOrganizationUsecaseInputDTO): Promise<any> {
        return await this.__addOrganization.execute(input);
    }

}