import mongoose from 'mongoose';
import logger from './utils/logger';
import { MONGOURI } from './constants';
import updateMongo from './bin/updateMongo';

export default function connect() {
  mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const mongo = mongoose.connection;
  mongo.on('error', (error) => {
    logger.error('Fatal: MongoDB connection error', error);
    process.exit(1);
  });

  mongo.on('open', async () => {
    logger.info('MongoDB connection successful');
    await updateMongo();
  });
}
