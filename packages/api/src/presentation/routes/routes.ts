import {Router} from "express";
import v1 from "./v1/routes";
const router = Router();

router.use('/api/v1', v1)

export { router }