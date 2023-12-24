export interface BaileysFacadeInterface{
  sendTextMessage(to: string, message: string): Promise<void>;
}