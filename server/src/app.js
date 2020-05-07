import express from 'express';
import bodyParser from 'body-parser';
import notes from './routers/notes';

import { loadContent } from './loadContent';
import git from './git';
import run from './run';
import updateRedis from './bin/updateRedis';

// loadContent();

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.get("/ping", (req, res) => {
  res.json({ message: "PONG" });
});

app.use('/notes', notes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
