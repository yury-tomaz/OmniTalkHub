
import { WhatsappAddedEvent } from "../../events/whatsapp-added.event";
import { AddWhatsappDto } from "./add-whatsapp.dto";
import { AddWhatsappUseCase } from "./add-whatsapp.usecase";
import Id from "../../../../@shared/domain/value-object/id.value-object";
const whatsappProvider = {
  create: jest.fn()
};



describe('Add Whatsapp Use Case - Unit Test', () => {
  let useCase: AddWhatsappUseCase;

  beforeAll(() => {
    useCase = new AddWhatsappUseCase(
      whatsappProvider,
      );
  });

  it('It should be possible to create an instance of WhatsApp', async () => {
    const input: AddWhatsappDto = {
      tenantId: new Id('tenantId'),
      name: 'name',
      webhookUrl: 'https://www.tensorflow.org/',
      allowWebhook: true,
      heardEvents: ['event1', 'event2']
    }


    const result = await useCase.execute(input);

    expect(result).toHaveProperty('id');
    expect(whatsappProvider.create).toHaveBeenCalled();
  });
});