import Id from "@/modules/@shared/domain/value-object/id.value-object";


export interface AddWhatsappDto{
  tenantId: Id;
  name: string;
  webhookUrl: string;
  allowWebhook: boolean;
  heardEvents: string[];
}