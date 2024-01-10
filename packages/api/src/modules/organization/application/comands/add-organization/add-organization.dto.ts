export interface AddOrganizationUsecaseInputDTO {
    name: string;
    realm: string;
    admin:{
        name: string;
        email: string;
        password: string;
    }
}