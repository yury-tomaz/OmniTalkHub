import { authProvider } from "@/presentation/app";
import { HandlerAuthentication } from "@/presentation/middlewares/authentication.middleware";
import { Request, Response, Router } from "express";


const authRoute = Router();

authRoute.post('/code', async (req: Request, res: Response) => {
 const { client_id, code, realm } = req.body;

 const result = await authProvider.getAccessToken({
  client_id,
  code,
  realm
 })


 res.status(200).json(result);
});

authRoute.get('/test', HandlerAuthentication ,(req: Request, res: Response) => {
 res.status(200).json({
  message: 'ok',
  user: req.user
 });
});


export default authRoute;
