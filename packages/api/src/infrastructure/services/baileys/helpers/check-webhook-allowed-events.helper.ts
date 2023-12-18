import { env } from "../../../config/env";

const checkWebhookAllowedEvents = (types: string[]) => {
  return types.some(type => env.webhookAllowedEvents.includes(type));
}

export { checkWebhookAllowedEvents}