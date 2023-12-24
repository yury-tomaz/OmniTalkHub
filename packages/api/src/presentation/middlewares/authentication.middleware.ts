import { NextFunction, Request, Response } from "express";


import axios from 'axios';
import env from "../../infrastructure/config/env";
import { logger } from "../../infrastructure/logger";
import { AppError, HttpCode } from "../../modules/@shared/domain/exceptions/app-error";


export async function HandlerAuthentication( req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  const refreshToken = req.headers['x-refresh-token'] as string;
  const tenant = req.headers['x-tenant-id'] as string;

  if (!authHeader) {
    unauthorizedResponse('header authorization is missing');
    return;
  }

  if (!tenant) {
    throw new AppError({
      message: 'header x-tenant-id is missing',
      statusCode: HttpCode['BAD_REQUEST'],
      isOperational: true,
    });
  }

  const [, token] = authHeader.split(' ');

  const url = `${env.keycloak.url}/realms/${tenant}/protocol/openid-connect/token/introspect`;

  const bodyParams = new URLSearchParams({
    token: token,
    client_id: env.keycloak.client_id,
    client_secret: env.keycloak.client_secret,
  }).toString();

  logger.info('checking token ...')
  const response = await axios.post(url, bodyParams,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

  if (response.data.error) {
    throw new AppError({
      message: response.data.error_description,
      statusCode: HttpCode['INTERNAL_SERVER_ERROR'],
      isOperational: true,
    });
  }

  const isTokenValid = handleTokenIntrospection(response.data);

  if (!isTokenValid && refreshToken) {
    const newToken = await handleRefreshToken(refreshToken, tenant);
    if (newToken) {
      res.setHeader('X-New-Access-Token', newToken.access_token);
      res.setHeader('x-New-refresh-token', newToken.refresh_token);
      return next();
    }

    unauthorizedResponse('token is not valid')
    return;
  }

  req.user = {
    id: response.data.sub,
    email_verified: response.data.email_verified,
    name: response.data.name,
    preferred_username: response.data.preferred_username,
    given_name: response.data.given_name,
    family_name: response.data.family_name,
    email: response.data.email,
    resource_access: response.data.resource_access,
    realm_access: response.data.realm_access,
    tenant: tenant,
  }

  logger.info('User is authenticated 🚀')
  return next();
}

function handleTokenIntrospection(introspect: any): boolean {
  const currentTimestamp = Math.floor(Date.now() / 1000);

  if (introspect.active) {
    if (introspect.exp && currentTimestamp > introspect.exp) {
      unauthorizedResponse('token has expired')
    } else if (introspect.iat && currentTimestamp < introspect.iat) {
      unauthorizedResponse('token is not valid yet')
    }
    return true;
  } else {
    return false;
  }
}

async function handleRefreshToken(refreshToken: string, tenant: string) {
  const url = `${env.keycloak.url}/realms/${tenant}/protocol/openid-connect/token`;
  const bodyParams = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: env.keycloak.client_id,
    client_secret: env.keycloak.client_secret,
  }).toString();

  const response = await axios.post(url, bodyParams, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (response.data.error) {
    throw new AppError({
      message: response.data.error_description,
      statusCode: response.status,
      isOperational: true,
    });
  }

  return response.data;
}

const unauthorizedResponse = (message: string) => {
  throw new AppError({
    message: message,
    statusCode: HttpCode['UNAUTHORIZED'],
    isOperational: true,
  });
}