import { IamFactory } from "../../../modules/IAM/factory/iam.factory";
import { Request, Response } from "express";
import { AppError, HttpCode } from "../../../modules/@shared/domain/exceptions/app-error";

export interface ImaController {
  login(req: Request, res: Response): Promise<void>;
}

export class ImaControllerV1 implements ImaController{
  private readonly _iamFacade = IamFactory.create();

  async login(req: Request, res: Response){
    const tenant = req.headers['x-tenant-id'] as string;

    if (!tenant) {
      throw new AppError({
        message: 'header x-tenant-id is missing',
        statusCode: HttpCode['BAD_REQUEST'],
        isOperational: true,
      });
    }

    const result = await this._iamFacade.login({
      realm: tenant,
      password: req.body.password,
      username: req.body.username,
    })
    res.json(result);
  }
}