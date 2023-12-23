import 'express-async-errors';
import express, { NextFunction, Request, Response  } from 'express';
import {logger} from '../infrastructure/logger';
import helmet from 'helmet';
import cors from 'cors';
import pinoHttp from 'pino-http';
import compression from "compression";

import { router } from './routes/routes';
import { errorHandler } from '../modules/@shared/domain/exceptions/error-handler';

const app = express();
app.use(helmet());
app.use(cors());
app.use(pinoHttp({logger}));
app.use(compression());
app.use(express.json());

app.use(router);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  logger.error(error);
  errorHandler.handleError(error, response);
})

export { app };