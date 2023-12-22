import env from "./infrastructure/config/env";
import { app } from "./infrastructure/presentation/app";
import { logger } from "./infrastructure/logger";

app.listen(env.port, () => {
 logger.info(`server run in por ${env.port}`)
});