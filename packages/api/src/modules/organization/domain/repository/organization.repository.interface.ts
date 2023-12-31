import RepositoryInterface from "@/modules/@shared/domain/repository/repository-interface";
import { Organization } from "../entity/organization.entity";


export interface OrganizationRepositoryInterface extends RepositoryInterface<Organization> {
    exists(id: string): Promise<boolean>;
    delete(id: string): Promise<void>;
}