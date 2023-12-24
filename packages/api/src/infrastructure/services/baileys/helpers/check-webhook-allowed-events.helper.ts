import  env  from "../../../config/env";

const checkWebhookAllowedEvents = (types: string[], allowedEvents: string[]) => {
  return types.some(type => allowedEvents.includes(type));
}

export { checkWebhookAllowedEvents}