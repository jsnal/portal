import mongoose from 'mongoose';
import { MONGOURI } from './constants';

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongo = mongoose.connection;
mongo.on('error', () => {
  console.error('Fatal: MongoDB connection error');
  process.exit(1);
});

mongo.on('open', () => {
  console.log('MongoDB connection successful');
});
