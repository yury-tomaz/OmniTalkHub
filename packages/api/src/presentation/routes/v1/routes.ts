import {Router, Request, Response } from "express";
import { WhatsappController } from "../../controllers/whatsapp.controller";
import { HandlerAuthentication } from "../../middlewares/authentication.middleware";
const v1 = Router();

const  whatsappController = new WhatsappController();

v1.post(
  '/whatsapp',
  HandlerAuthentication,
  (req: Request, res: Response) => whatsappController.add(req, res)
);


export default v1