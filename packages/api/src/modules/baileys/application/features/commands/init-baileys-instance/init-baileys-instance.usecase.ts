import { WhatsappInstancesGateway } from "../../../../gateway/whatsapp-instances.gateway";
import { BaileysFactory } from "../../../../../../infrastructure/services/baileys/baileys.factory";
import { InitBaileysInstanceInputDTO } from "./init-baileys-instance.dto";
import { Whatsapp } from "../../../../domain/baileys-instance.entity";
import Id from "../../../../../@shared/domain/value-object/id.value-object";


export class InitBaileysInstanceUseCase {
  constructor(
    private whatsappInstancesGateway: WhatsappInstancesGateway,
    private baileysFactory: BaileysFactory,
  ) {
  }

  async execute(input: InitBaileysInstanceInputDTO): Promise<void> {
    const foundInstance = await this.whatsappInstancesGateway.find(input.key);

    if (foundInstance) {
      throw new Error('Instance already exists');
    }

    const props = {
      key: new Id(`${input.key}-${input.tenantId}`),
      tenantId: new Id(input.tenantId),
      webhookUrl: input.webhookUrl,
      allowWebhook: input.allowWebhook,
    }

    const instance = new Whatsapp(props);

    const baileys = this.baileysFactory.create({
      key: instance.key.id,
      tenantId: instance.tenantId.id,
      webhookUrl: instance.webhookUrl,
      allowWebhook: instance.allowWebhook,
    });

    await this.whatsappInstancesGateway.add(baileys);
  }
}