import { Router } from "express";
import v1 from "./v1/routes";
import { logger } from "@/infrastructure/logger";
const router = Router();

router.use('/api/v1', v1);

router.get('/auth/callback', (req, res) => {
    logger.info('Auth callback');
    res.send('OK')
});

export { router }