import { WhatsappRepositoryInMemory } from "@/infrastructure/persistence/repositories/whatsapp-instances.repository";
import { BaileysFactory } from "@/infrastructure/services/baileys/baileys.factory";
import Id from "@/modules/@shared/domain/value-object/id.value-object";
import { Whatsapp } from "@/modules/whatsapp/domain/whatsapp.entity";
import { GetQrcodeUseCase } from "./get-qrcode.usecase";
import e from "express";
import { logger } from "@/infrastructure/logger";

const repository = WhatsappRepositoryInMemory.getInstance();

const whatsapp = new Whatsapp({
    name: 'test',
    allowWebhook: false,
    webhookUrl: 'https://www.google.com',
    tenantId: new Id('gutu'),
    heardEvents: ['all'],
});

describe('GetQrcodeUseCase unit test', () => {
    let useCase:GetQrcodeUseCase; 
  
    beforeEach(async () => {
        new BaileysFactory().create(whatsapp);
        useCase = new GetQrcodeUseCase(repository);

        await new Promise((resolve) => {
            setTimeout(() => {
                resolve('');
            }, 5000);
        });

    }, 7000);
    
    it('should return qrcode', async () => {
        const result = await useCase.execute(whatsapp.id.id);
        expect(result).toBeDefined();
        expect(isBase64(result)).toBeTruthy();
       
    });
});


function isBase64(str: string | undefined): boolean {
    if (!str) return false;

    const base64Data = str.replace(/^data:image\/\w+;base64,/, '');
    const base64Regex = /^(?:[A-Za-z\d+/]{4})*(?:[A-Za-z\d+/]{2}==|[A-Za-z\d+/]{3}=)?$/;

    return base64Regex.test(base64Data);
}