import request from 'supertest';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { app } from '@/presentation/app';
import { logger } from '@/infrastructure/logger';
import axios from 'axios';
import * as process from "process";

describe('Middleware Auth e2e test', () => {
  let server: Server<typeof IncomingMessage, typeof ServerResponse>;
  let api: any;

  let keycloakApi = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  beforeAll(async () => {
    server = app.listen(() => logger.info('Server running'));
    api = request(server);
  });

  afterAll(async () => {
    server.close();
  });

  it('the middleware should check the authenticity of the access_token', async () => {

    const formData = new URLSearchParams();
    formData.append('grant_type', 'password');
    formData.append('client_id', process.env.KEYCLOAK_CLIENT_ID!);
    formData.append('client_secret', process.env.KEYCLOAK_CLIENT_SECRET!);
    formData.append('scope', 'openid');
    formData.append('username', process.env.KEYCLOAK_USERNAME!);
    formData.append('password', process.env.KEYCLOAK_PASSWORD!);

    const {data} = await keycloakApi.post('/realms/teste/protocol/openid-connect/token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const {
      access_token,
      refresh_token,
    } = data;


    const response = await api.get('/api/v1/auth/test')
      .set('Authorization', `Bearer ${access_token}`)
      .set('Content-Type', 'application/json')
      .set('x-refresh-token', refresh_token)
      .set('x-tenant-id', 'teste')
      .set('x-client-id', 'react_client')

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('user');
  });

});