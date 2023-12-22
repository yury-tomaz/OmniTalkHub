import { Router, Request, Response, NextFunction } from 'express';
import { ImaControllerV1 } from '../controllers/ima.controller.v1';

const imaRouteV1 = Router();
const controller = new ImaControllerV1();

imaRouteV1.post('/login', (req: Request, res: Response) => controller.login(req, res));

export default imaRouteV1;