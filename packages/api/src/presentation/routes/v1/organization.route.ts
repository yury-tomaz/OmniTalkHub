import { OrganizationController } from "@/presentation/controllers/organization.controller";
import { Router } from "express";

const organizationRoute = Router();

const organizationController = new OrganizationController();

organizationRoute.post('/',(req, res) => organizationController.add(req, res));

export default organizationRoute;