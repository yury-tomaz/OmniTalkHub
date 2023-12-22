import { Router } from "express";
import imaRouteV1 from "./ima.route.v1";

const router = Router();
router.use('/api/v1/auth',  imaRouteV1);

export { router }