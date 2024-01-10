require('dotenv').config();

const PORT = process.env.PORT || 3333;
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const USER_AGENT = process.env.USER_AGENT || 'wa-bot';
const api_url = process.env.API_URL || 'http://localhost:3333';

const WEBHOOK_CONFIG = {
  enabled: (process.env.WEBHOOK_ENABLED && process.env.WEBHOOK_ENABLED === 'true') || false,
  url: process.env.WEBHOOK_URL || 'http://localhost:3333/webhook',
  base64: (process.env.WEBHOOK_BASE64 && process.env.WEBHOOK_BASE64 === 'true') || false,
  protectRoutes: (process.env.PROTECT_ROUTES && process.env.PROTECT_ROUTES === 'true') || false,
  markMessagesRead: (process.env.MARK_MESSAGES_READ && process.env.MARK_MESSAGES_READ === 'true') || false,
  allowedEvents: process.env.WEBHOOK_ALLOWED_EVENTS?.split(',') || ['all'],
}

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/wa-bot';


const KEYCLOAK_CONFIG =  {
  runMode: (process.env.RUN_KEYCLOAK_API_IN_MOCK_MODE && process.env.RUN_KEYCLOAK_API_IN_MOCK_MODE === 'true') || false,
  url: process.env.KEYCLOAK_API_URL || 'http://localhost:8080/auth',
  client_id: process.env.KEYCLOAK_ADMIN_CLIENT_ID || 'web-client',
  client_secret: process.env.KEYCLOAK_ADMIN_CLIENT_SECRET || 'secret',
  client_creation:{
    client_name: process.env.KEYCLOAK_CLIENT_NAME || 'web-client',
    client_id: process.env.KEYCLOAK_CLIENT_ID || 'web-client',
    root_url: process.env.KEYCLOAK_CLIENT_ROOT_URL || 'http://localhost:3000',
    redirect_uris: process.env.KEYCLOAK_CLIENT_REDIRECT_URIS?.split(',') || ['/*'],
    web_origins: process.env.KEYCLOAK_CLIENT_WEB_ORIGINS?.split(',') || ['*'],
    implicit_flow_enabled: (process.env.KEYCLOAK_INPLICIT_FLOW_ENABLED && process.env.KEYCLOAK_INPLICIT_FLOW_ENABLED === 'true') || false,
  }
  

}

export default {
  port: PORT,
  api_url,
  userAgent: USER_AGENT,
  logLevel: LOG_LEVEL,
  webhook: WEBHOOK_CONFIG,
  database: DATABASE_URL,
  keycloak: KEYCLOAK_CONFIG,
}