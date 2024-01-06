import 'express-async-errors';
import express, { NextFunction, Request, Response  } from 'express';
import http from "http"
import { Server } from "socket.io";
import {logger} from '@/infrastructure/logger';
import helmet from 'helmet';
import cors from 'cors';
import pinoHttp from 'pino-http';
import compression from 'compression';
import { router } from './routes/routes';

import './process';
import { AuthFactory } from '@/infrastructure/providers/auth/factory/auth.factory';
import { errorHandler } from "@/modules/@shared/domain/exceptions/error-handler";

const app = express();

const serverhttp = http.createServer(app);
const io = new Server(serverhttp);

app.use(helmet());
app.use(cors());
app.use(pinoHttp({logger}));
app.use(compression());
app.use(express.json());

const authProvider = AuthFactory.create();


app.use(router);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  logger.error(error);
  errorHandler.handleError(error, response);
})

export { serverhttp, authProvider, io };