import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mockingPetsRouter from './routes/mockingpets.router.js';
import loggerRouter from './routes/logger.router.js';

import { errorHandler }  from './middlewares/errorHandler.js';
import { addLogger } from './middlewares/addLogger.js';
import { getLogger } from './utils/logger.js';



const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect('mongodb+srv://sebas-testing:Sebastian10@cluster-testing.jz2bbsf.mongodb.net/adoptme?retryWrites=true&w=majority&appName=Cluster-Testing');


app.use(express.json());
app.use(cookieParser());
app.use(addLogger); 

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api', mockingPetsRouter);
app.use('/loggerTest', loggerRouter);

//Manejo de errores
app.use(errorHandler); 


// Arranque del servidor con logger
const logger = getLogger();
app.listen(PORT, () => {
  logger.info(`✅ Servidor escuchando en puerto ${PORT}`);
});
