import { WhatsappController } from "@/presentation/controllers/whatsapp.controller";
import { HandlerAuthentication } from "@/presentation/middlewares/authentication.middleware";
import {Router, Request, Response } from "express";

const whatsappRoute = Router();

const  whatsappController = new WhatsappController();

whatsappRoute.post(
 '/',
 HandlerAuthentication,
 (req: Request, res: Response) => whatsappController.add(req, res)
);

whatsappRoute.get(
 '/:id/qrcode',
 HandlerAuthentication,
 (req: Request, res: Response) => whatsappController.getQrcode(req, res)
);

export default whatsappRoute;