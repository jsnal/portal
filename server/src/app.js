import express from 'express';
import { m_hgetall } from './redis';

m_hgetall(['notes:1', 'notes:1'], function(err, arr) {
  console.log('Received output from Redis Multi/Exec:');
  console.log(arr);
});

// TODO: put all the express things into its own file
// const app = express();
// app.listen(3000,() => console.log(`Server is listening on port 3000`))
