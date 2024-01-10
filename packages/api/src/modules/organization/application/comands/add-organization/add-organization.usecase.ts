import { AppError, HttpCode } from "@/modules/@shared/domain/exceptions/app-error";
import { AddOrganizationUsecaseInputDTO } from "./add-organization.dto";

import EventDispatcherInterface from "@/modules/@shared/domain/events/event-dispatcher.interface";
import { OrganizationCreatedEvent } from "../../events/organization-created.event";
import { OrganizationRepositoryInterface } from "@/modules/organization/domain/repository/organization.repository.interface";
import { Organization } from "@/modules/organization/domain/entity/organization.entity";

export class AddOrganizationUseCase {
    constructor(
        private readonly organizationRepository: OrganizationRepositoryInterface,
        private readonly eventDispatcher: EventDispatcherInterface,
        private readonly event: typeof OrganizationCreatedEvent,
    ){}

    public async execute(input:AddOrganizationUsecaseInputDTO): Promise<any> {
        const alreadyThere = await this.organizationRepository.exists(input.realm);

        if(alreadyThere) throw new AppError({
            message: 'Organization already exists',
            statusCode: HttpCode['CONFLICT'],
            isOperational: true,
        })

        const organization = new Organization({
            realm: input.realm,
            name: input.name,
        });

        await this.organizationRepository.create(organization);

        this.eventDispatcher.notify(new this.event({
            realm: input.realm,
            admin: input.admin,
        }))

        return {
            ...organization.toPrimitives(),
            admin: input.admin,
        };
    }
}
