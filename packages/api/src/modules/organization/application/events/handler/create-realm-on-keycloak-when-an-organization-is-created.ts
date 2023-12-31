import EventHandlerInterface from "@/modules/@shared/domain/events/event-handler.interface";
import { OrganizationCreatedEvent } from "../organization-created.event";
import { authProvider } from "@/presentation/app";
import { PrismaClientManager } from "@/infrastructure/services/prisma-client-manager";

export class CreateRealmOnKeycloakWhenAnOrganizationIsCreated implements EventHandlerInterface<OrganizationCreatedEvent>{
    private prismaClientManager = PrismaClientManager.getInstance();

    async handle(event: OrganizationCreatedEvent) {

        const { realm,admin} = event.eventData;
        const { email,name, password } = admin;

        if(!realm) throw new Error('Realm name is required');
        if(!email) throw new Error('Admin email is required');
        if(!name) throw new Error('Admin name is required');
        if(!password) throw new Error('Admin password is required');
       
        await authProvider.createRealm(realm);
        await authProvider.createClient(realm);

        await authProvider.createUser({
            email: email,
            name: name,
            realm,
            realmRoles: ['admin']
        })

        await this.prismaClientManager.createNewTenant(realm);
    }
}