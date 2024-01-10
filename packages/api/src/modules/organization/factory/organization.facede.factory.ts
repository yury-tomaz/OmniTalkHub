import { OrganizationRepository } from "@/infrastructure/persistence/repositories/organization-repository/organization.repository";
import { AddOrganizationUseCase } from "../application/comands/add-organization/add-organization.usecase";
import EventDispatcher from "@/modules/@shared/domain/events/event-dispatcher";
import { OrganizationCreatedEvent } from "../application/events/organization-created.event";
import { OrganizationFacade } from "../facade/organization.facade";
import { CreateRealmOnKeycloakWhenAnOrganizationIsCreated } from "../application/events/handler/create-realm-on-keycloak-when-an-organization-is-created";

export class OrganizationFacadeFactory{
    static create(){
        const organizationRepository = new OrganizationRepository();
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new CreateRealmOnKeycloakWhenAnOrganizationIsCreated();

        eventDispatcher.register("OrganizationCreatedEvent", eventHandler);

        const addOrganization = new AddOrganizationUseCase(
            organizationRepository,
            eventDispatcher,
            OrganizationCreatedEvent
        )

        return new OrganizationFacade({
            addOrganization,
        })
    }
}