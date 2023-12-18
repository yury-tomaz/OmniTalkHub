import { NextFunction, Request, Response } from "express";
import { AppError, HttpCode } from "../../../modules/@shared/domain/exceptions/app-error";
import { logger } from "../../logger";
import axios from 'axios';

export async function HandlerAuthentication(req: Request, res: Response, next: NextFunction) {
 const authHeader = req.headers.authorization;
 const refreshToken = req.headers['x-refresh-token'] as string;
 const tenant = req.headers['x-tenant-id'] as string;
 const client_id = req.headers['x-client-id'] as string;
 const client_secret = req.headers['x-client-secret'] as string;

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

 if (!client_id || !client_secret) {
  throw new AppError({
   message: 'header x-client-id or x-client-secret is missing',
   statusCode: HttpCode['BAD_REQUEST'],
   isOperational: true,
  });
 }

 const [, token] = authHeader.split(' ');


 const url = `http://localhost:8080/realms/${tenant}/protocol/openid-connect/token/introspect`;

 const bodyParams = new URLSearchParams({
  token: token,
  client_id: client_id,
  client_secret: client_secret,
 }).toString();

 logger.info('checking token ...')
 const response = await axios.post(url, bodyParams, {
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
  const newToken = await handleRefreshToken(refreshToken, tenant, client_id, client_secret);
  if (newToken) {
   res.setHeader('X-New-Access-Token', newToken.access_token);
   res.setHeader('x-New-refresh-token', newToken.refresh_token);
   return next();
  }
  unauthorizedResponse('token is not valid')
  return;
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

async function handleRefreshToken(refreshToken: string, tenant: string, client_id: string, client_secret: string) {
 const url = `http://localhost:8080/realms/${tenant}/protocol/openid-connect/token`;
 const bodyParams = new URLSearchParams({
  grant_type: 'refresh_token',
  refresh_token: refreshToken,
  client_id: client_id,
  client_secret: client_secret,
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