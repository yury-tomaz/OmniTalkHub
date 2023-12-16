const PORT = process.env.PORT || 3333;
const WEBHOOK_ENABLED = (process.env.WEBHOOK_ENABLED && process.env.WEBHOOK_ENABLED === 'true') || false;
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'http://localhost:3333/webhook';

const WEBHOOK_BASE64 = (process.env.WEBHOOK_BASE64 && process.env.WEBHOOK_BASE64 === 'true') || false;
const PROTECT_ROUTES = (process.env.PROTECT_ROUTES && process.env.PROTECT_ROUTES === 'true') || false;
const MARK_MESSAGES_READ = (process.env.MARK_MESSAGES_READ && process.env.MARK_MESSAGES_READ === 'true') || false;
const WEBHOOK_ALLOWED_EVENTS = process.env.WEBHOOK_ALLOWED_EVENTS?.split(',') || ['all'];
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'user';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
const DB_DATABASE = process.env.DB_DATABASE || 'database';

export const env = {
  port: PORT,
  webhookEnabled: WEBHOOK_ENABLED,
  webhookUrl: WEBHOOK_URL,
  webhookBase64: WEBHOOK_BASE64,
  protectRoutes: PROTECT_ROUTES,
  markMessagesRead: MARK_MESSAGES_READ,
  webhookAllowedEvents: WEBHOOK_ALLOWED_EVENTS,
  logLevel: LOG_LEVEL,
  db: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  }
}