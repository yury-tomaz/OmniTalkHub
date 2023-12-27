require('dotenv').config();

const PORT = process.env.PORT || 3333;
const JWT_KEY = process.env.JWT_KEY || 'secret';
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

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
  client_id: process.env.KEYCLOAK_ADMIN_CLIENT_ID || 'react_client',
  client_secret: process.env.KEYCLOAK_ADMIN_CLIENT_SECRET || 'secret',
}

export default {
  port: PORT,
  logLevel: LOG_LEVEL,
  webhook: WEBHOOK_CONFIG,
  jwtKey: JWT_KEY,
  database: DATABASE_URL,
  keycloak: KEYCLOAK_CONFIG,
}