import  env  from "../../../config/env";

const checkWebhookAllowedEvents = (types: string[]) => {
  return types.some(type => env.webhook.allowedEvents.includes(type));
}

export { checkWebhookAllowedEvents}