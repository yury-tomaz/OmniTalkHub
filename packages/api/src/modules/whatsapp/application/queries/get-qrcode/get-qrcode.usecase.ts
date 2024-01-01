import { WhatsappRepositoryInMemory } from "@/infrastructure/persistence/repositories/whatsapp-instances.repository";
import { AppError, HttpCode } from "@/modules/@shared/domain/exceptions/app-error";

export interface GetQrcodeUseCaseInputDTO{
  key: string;
  tenantId: string;
}

export class GetQrcodeUseCase {
  constructor(
    private readonly repository: WhatsappRepositoryInMemory,
    ) {}

  async execute(input: GetQrcodeUseCaseInputDTO){

    const result = await this.repository.find(input.key);

    if(!result){
        throw new AppError({
            message: 'Whatsapp instance not found',
            statusCode: HttpCode['NOT_FOUND'],
            isOperational: true,
        })
    }

    if(result.tenantId !== input.tenantId){
        throw new AppError({
          message: 'Whatsapp instance not found',
          statusCode: HttpCode['NOT_FOUND'],
          isOperational: true,
        })
    }


    return result.qr;
  }
}