import mongoose from 'mongoose';
import { MONGOURI } from './constants';
import updateMongo from './bin/updateMongo';

export default function connect() {
  mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const mongo = mongoose.connection;
  mongo.on('error', () => {
    console.error('Fatal: MongoDB connection error');
    process.exit(1);
  });

  mongo.on('open', async () => {
    console.log('MongoDB connection successful');
    await updateMongo();
  });
}
