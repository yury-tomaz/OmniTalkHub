import ValidatorInterface from "../../../@shared/validator/validator.interface";
import { Whatsapp } from "../whatsapp.entity";
import * as yup from "yup";

export class WhatsappYupValidator implements ValidatorInterface<Whatsapp> {

  validate(entity: Whatsapp): void {
    try {
      yup
        .object({
          id: yup.string().required(),
          name: yup.string().required(),
          tenantId: yup.string().required(),
          allowWebhook: yup.boolean().required(),
          webhookUrl: yup.string().url(),
          heardEvents: yup.array().of(yup.string()),
        })
        .validateSync(
          {
            id: entity.id.id,
            name: entity.name,
            tenantId: entity.tenantId.id,
            allowWebhook: entity.allowWebhook,
            webhookUrl: entity.webhookUrl,
            heardEvents: entity.heardEvents,
          },
          {abortEarly: false}
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "customer",
          message: error,
        });
      });
    }
  }
}