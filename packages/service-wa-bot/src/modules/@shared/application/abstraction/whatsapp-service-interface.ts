export interface WhatsappServiceInterface{
 key: string;
 tenantId: string;
 socket: any;
 qrCode: string | undefined;
 status: string | undefined;
 qrRetry: number | undefined;
 chats: any[];
 messages: any[];
 webhookUrl: string;
 allowWebhook: boolean;
}