import 'babel-polyfill';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import notes from './routers/notes';
import secret from './routers/secret';
import logger, { morganFormat } from './utils/logger';
import connectMongo from './mongoose';

connectMongo();

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan((tokens, req, res) => morganFormat(tokens, req, res)));
app.use(function(req, res) {
  res.header("Access-Control-Allow-Origin", "http://jasonlong.xyz");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

app.get('/ping', (req, res) => {
  res.json({ message: 'PONG' });
});

app.use('/notes', notes);
app.use('/secret', secret);

app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
});
