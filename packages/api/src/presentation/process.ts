import { logger } from "@/infrastructure/logger";
import { errorHandler } from "@/modules/@shared/domain/exceptions/error-handler";

process.on('unhandledRejection', (error: Error) => {
 logger.error(`Unhandled Rejection: ${error.message || error}`);

 errorHandler.handleError(error);
}); 