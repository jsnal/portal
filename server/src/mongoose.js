import mongoose from 'mongoose';

const mongoURI = 'mongodb://127.0.0.1/portal';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongo = mongoose.connection;
mongo.on('error', () => {
  console.error('Fatal: MongoDB connection error');
  process.exit(1);
});

mongo.on('open', function (ref) {
  console.log('MongoDB connection successful');
});
