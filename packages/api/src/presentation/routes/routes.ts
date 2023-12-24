import {Router, Request, Response } from "express";
import v1 from "./v1/routes";
const router = Router();

router.get('/health', (req: Request, res: Response) => {
  res.status(200);
});

router.use('/api/v1', v1);

export { router }