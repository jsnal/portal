import express from 'express';
import cors from 'cors';
import notes from './routers/notes';
import updateMongo from './bin/updateMongo';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/ping', (req, res) => {
  res.json({ message: 'PONG' });
});

app.use('/notes', notes);

app.listen(PORT, async () => {
  await updateMongo();
  console.log(`Server is listening on port ${PORT}`);
});
