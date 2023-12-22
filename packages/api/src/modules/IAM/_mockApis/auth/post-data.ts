import mock from "../mock";
import { faker } from '@faker-js/faker';

const outputAuth = {
 access_token: faker.string.uuid(),
 expires_in: 300,
 refresh_expires_in: 1800,
 refresh_token: faker.string.uuid(),
 token_type: 'bearer',
 id_token: faker.string.uuid(),
 'not-before-policy': 0,
 session_state: faker.string.uuid(),
 scope: 'openid email profile',
};

const outputAuthError = {
 error: 'invalid_grant',
 error_description: 'Invalid user credentials',
};

mock.onPost('/realms/jest/protocol/openid-connect/token').reply(200, outputAuth);
mock.onPost('/realms/jest/protocol/openid-connect/token').reply(400, outputAuthError);
export { outputAuth, outputAuthError };