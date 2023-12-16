import ValidatorInterface from "../../@shared/validator/validator.interface";
import { Tenant } from "../domain/tenant.entity";
import * as yup from "yup";

export class TenantYupValidator implements ValidatorInterface<Tenant> {

  async validate(entity: Tenant): Promise<void> {

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
    });

    try {
      await schema.validate(entity, { abortEarly: false });
    }catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {

      });
    }
  }
}