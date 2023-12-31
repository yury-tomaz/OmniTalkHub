import { OrganizationCreatedEvent } from '../../events/organization-created.event';
import { AddOrganizationUseCase } from './add-organization.usecase';

import { faker } from '@faker-js/faker';

const organizationRepository = {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    exists: jest.fn().mockResolvedValue(false),
}

const eventDispatcher = {
    notify: jest.fn(),
    register: jest.fn(),
    unregister: jest.fn(),
    unregisterAll: jest.fn()
};


describe('AddOrganizationUseCase', () => {
    let useCase: AddOrganizationUseCase;

    beforeEach(() => {
        useCase = new AddOrganizationUseCase(
            organizationRepository,
            eventDispatcher,
            OrganizationCreatedEvent
        );
    });

    it('should create a new organization', async () => {
        const organizationData = {
            realm: 'test',
            name: 'Test Organization',
            admin: {
                email: faker.internet.email(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                password: faker.internet.password(),
            }
        };

        const createdOrganization = await useCase.execute(organizationData);

        expect(organizationRepository.exists).toHaveBeenCalled();
        expect(organizationRepository.create).toHaveBeenCalled();
        expect(createdOrganization.name).toBe(organizationData.name);
        expect(createdOrganization.realm).toBe(organizationData.realm);
        expect(createdOrganization.admin).toBeDefined();
    });
});
