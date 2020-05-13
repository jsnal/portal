import express from 'express';
import bodyParser from 'body-parser';
import notes from './routers/notes';
import mongoose from './mongoose';
import { updateMongo } from './bin/updateMongo';

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.get("/ping", (req, res) => {
  res.json({ message: "PONG" });
});

app.use('/notes', notes);

app.listen(PORT, async () => {
  await updateMongo();
  console.log(`Server is listening on port ${PORT}`);
});
