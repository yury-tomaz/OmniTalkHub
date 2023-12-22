import { IamFacadeInterface } from "./iam.facade.interface";
import { AuthenticateInputDTO } from "../application/features/commands/authenticate-user/authenticate-use.dto";

interface UseCaseInterface{
  execute(input: any): Promise<any>;
}

interface UseCaseProps{
  authenticateUseCase: UseCaseInterface;
}


export class IamFacade implements IamFacadeInterface {
  private _authenticateUseCase: UseCaseInterface;

  constructor(useCaseProps: UseCaseProps) {
    this._authenticateUseCase = useCaseProps.authenticateUseCase;
  }

  async login(input: AuthenticateInputDTO): Promise<any> {
    return this._authenticateUseCase.execute(input);
  }
}