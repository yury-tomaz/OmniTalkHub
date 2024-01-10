import env from "@/infrastructure/config/env";
import { logger } from "@/infrastructure/logger";
import { serverhttp as app } from "@/presentation/app";

app.listen(env.port, () => {
 logger.info(`server run in por ${env.port}`)
});