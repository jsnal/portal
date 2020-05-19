import 'babel-polyfill';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import notes from './routers/notes';
import logger, { morganFormat } from './utils/logger';
import connectMongo from './mongoose';

connectMongo();

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan((tokens, req, res) => morganFormat(tokens, req, res)));

app.get('/ping', (req, res) => {
  res.json({ message: 'PONG' });
});

app.use('/notes', notes);

app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
});
