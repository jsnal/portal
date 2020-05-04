import express from 'express';
import bodyParser from 'body-parser';
import notes from './routers/notes';
import { m_hgetall } from './redis';

import git from './git';
import run from './run';


async function test() {
  let r = await run(git(['ls-tree', '--full-tree', '-r', 'content']));
  console.log(r);
}
test();

const PORT = 3000;
// m_hgetall(['notes:1', 'notes:1'], function(err, arr) {
//   console.log('Received output from Redis Multi/Exec:');
//   console.log(arr);
// });

const app = express();

app.use(bodyParser.json());

app.get("/ping", (req, res) => {
  res.json({ message: "PONG" });
});

app.use('/notes', notes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
