import {Router} from "express";
import whatsappInstanceRoute from "./whatsapp-instance.route";

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello Doido!');
});

router.use('/whatsapp-baileysInstance', whatsappInstanceRoute);

export {router}