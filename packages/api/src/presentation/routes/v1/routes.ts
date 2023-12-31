import {Router, Request, Response } from "express";
import whatsappRoute from "./whatsapp.route";
import authRoute from "./auth.route";
import organizationRoute from "./organization.route";

const v1 = Router();
v1.use('/auth', authRoute);
v1.use('/baileys', whatsappRoute);
v1.use('/admin/organization', organizationRoute);

export default v1