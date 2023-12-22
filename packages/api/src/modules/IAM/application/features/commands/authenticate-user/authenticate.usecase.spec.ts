import { AuthenticateUseCase } from "./authenticate-use.case";
import "../../../../_mockApis/index";
import mock from "../../../../_mockApis/mock";
import { outputAuth } from "../../../../_mockApis/auth/post-data";
import * as process from "process";
import env from "../../../../../../infrastructure/config/env";

describe("AuthenticateUseCase unit test", () => {
  let usecase: AuthenticateUseCase;

  beforeAll(() => {
    usecase = new AuthenticateUseCase();


  });

  it("should be able authenticate user", async () => {
    const input = {
      realm: 'teste',
      client_id: env.keycloak.client_id,
      grant_type: 'password',
      client_secret: env.keycloak.client_secret,
      scope: 'openid',
      username: env.keycloak.testUsername,
      password: env.keycloak.testPassword,
    };

    if(env.keycloak.runMode) {
      mock.onPost(`/realms/teste/protocol/openid-connect/token`)
        .reply(200, outputAuth);
    }

    const response = await usecase.execute(input);

    expect(response).toHaveProperty("access_token");
    expect(response).toHaveProperty("expires_in");
    expect(response).toHaveProperty("refresh_expires_in");
    expect(response).toHaveProperty("refresh_token");
    expect(response).toHaveProperty("token_type");
    expect(response).toHaveProperty("not-before-policy");
    expect(response).toHaveProperty("session_state");
    expect(response).toHaveProperty("scope");
  })

  it("should be able authenticate user with wrong password", async () => {
    const input = {
      realm: 'teste',
      client_id: env.keycloak.client_id,
      grant_type: 'password',
      client_secret: env.keycloak.client_secret,
      scope: 'openid',
      username: env.keycloak.testUsername,
      password: 'wrong-password',
    };

    try {
      await usecase.execute(input);
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toHaveProperty("error");
      expect(error).toHaveProperty("error_description");
    }
  });

});