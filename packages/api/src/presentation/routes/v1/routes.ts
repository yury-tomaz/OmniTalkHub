import {Router, Request, Response } from "express";
import whatsappRoute from "./whatsapp.route";
import authRoute from "./auth.route";

const v1 = Router();
v1.use('/auth', authRoute)
v1.use('/baileys', whatsappRoute)

export default v1