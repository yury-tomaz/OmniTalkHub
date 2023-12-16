import { app } from "./infrastructure/express/app";
import { logger } from "./infrastructure/logger";

const port = 3000;

app.listen(port, () => {
 logger.info(`server run in por: ${port}`)
});