import { AuthFactory } from "@/infrastructure/providers/auth/factory/auth.factory";
import { Router, Request, Response } from "express";

const authRoute = Router();
const authProvider = AuthFactory.create();

authRoute.post('/code', async (req: Request, res: Response) => {
 const { client_id, code, realm } = req.body;

 const result = await authProvider.getAccessToken({
  client_id,
  code,
  realm
 })


 res.status(200).json(result);
});


export default authRoute;
