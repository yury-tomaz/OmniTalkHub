import { AuthenticateInputDTO, AuthenticateOutputDTO } from "./authenticate-use.dto";
import axiosServices from "../../../../axios";
import { logger } from "../../../../../../infrastructure/logger";
import { AppError } from "../../../../../@shared/domain/exceptions/app-error";
import env from "../../../../../../infrastructure/config/env";

type input = AuthenticateInputDTO;
type output = AuthenticateOutputDTO;

export class AuthenticateUseCase {

  async execute(input: input): Promise<output> {
    const endpoint = `/realms/${input.realm}/protocol/openid-connect/token`;

    const formData = new URLSearchParams();

    formData.append("client_id", env.keycloak.client_id);
    formData.append("grant_type", 'password');
    formData.append("client_secret", env.keycloak.client_secret);
    formData.append("scope", 'openid');
    formData.append("username", input.username);
    formData.append("password", input.password);

    logger.info(`[AuthenticateUseCase] - Authenticating user "${input.username}@${input.realm} ..."`);

    try {
      const response = await axiosServices.post(endpoint,
        formData.toString(),
        {
          headers: {
            "Content-'ype": "application/x-www-form-urlencoded"
          }
        }
      );

      logger.info(`[AuthenticateUseCase] - User "${input.username}@${input.realm}" authenticated successfully`);
      return response.data;
    }catch (error:any) {
      throw new AppError({
        message: error.error_description?? 'Error on authenticate user',
        statusCode: 401,
        isOperational: true,
      })
    }
  }
}