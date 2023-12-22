import { AuthenticateInputDTO } from "../application/features/commands/authenticate-user/authenticate-use.dto";

export interface IamFacadeInterface{
  login(input: AuthenticateInputDTO): Promise<any>;
}