// src/app.js
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

import loggerRouter from './routes/logger.router.js';
import mocksRouter from './routes/mocks.router.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { addLogger } from './middlewares/addLogger.js';
import { swaggerUi, swaggerSpecs } from './docs/swaggerConfig.js';

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb+srv://sebas-testing:Sebastian10@cluster-testing.jz2bbsf.mongodb.net/adoptme?retryWrites=true&w=majority&appName=Cluster-Testing')
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar MongoDB', err);
  });

app.use(express.json());
app.use(cookieParser());
app.use(addLogger);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/loggerTest', loggerRouter);
app.use('/api/mocks', mocksRouter);

app.use(errorHandler);
