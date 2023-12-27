import WhatsappFacadeFactory from "../../modules/whatsapp/factory/whatsapp.facade.factory";
import { Request, Response } from "express";
import  id from "../../modules/@shared/domain/value-object/id.value-object";
import { AppError, HttpCode } from "../../modules/@shared/domain/exceptions/app-error";

export class WhatsappController {
  private service = WhatsappFacadeFactory.create();

  async add(req: Request, res: Response) {
    const tenantId = req.headers['x-tenant-id'] as string;

    if(!tenantId){
      throw new AppError({
        message: 'header x-tenant-id is missing',
        statusCode: HttpCode['BAD_REQUEST'],
        isOperational: true,
      });
    }

   const execute = await this.service.add({
      tenantId: new id(tenantId),
      heardEvents: req.body.heardEvents,
      name: req.body.name,
      webhookUrl: req.body.webhookUrl,
      allowWebhook: req.body.allowWebhook,
    })

    res.status(HttpCode['OK']).json({ 
      content: {
        id: execute.id.id,
        tenantId: execute.tenantId.id,
        webhookUrl: execute.webhookUrl,
        allowWebhook: execute.allowWebhook,
        heardEvents: execute.heardEvents,
        createdAt: execute.createdAt,
        updatedAt: execute.updatedAt
      },
      _links: [
        {
          rel: 'self',
          href: `${req.protocol}://${req.get('host')}/v1/whatsapp/${execute.id.id}`,
          type: 'GET'
        },
        {
          rel: 'qrCode',
          href: `${req.protocol}://${req.get('host')}/v1/whatsapp/${execute.id.id}/qrcode`,
          type: 'GET'
        }
      ]
    });
  }
}