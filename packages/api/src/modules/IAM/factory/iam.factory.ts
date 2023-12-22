import { IamFacade } from "../facade/iam.facade";
import { AuthenticateUseCase } from "../application/features/commands/authenticate-user/authenticate-use.case";

export class IamFactory {
  static create(){
    const authenticateUseCase = new AuthenticateUseCase();

    return new IamFacade({
      authenticateUseCase,
    })
  }
}