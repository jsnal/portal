import mongoose from 'mongoose';
import logger from '../utils/logger';

const { Schema } = mongoose;

const MetadataSchema = new Schema({
  _id: Number,
  head: String,
}, {
  _id: false,
});

const Metadata = mongoose.model('MetadataModel', MetadataSchema);

async function setInitialData() {
  return Metadata.collection.insertOne({
    _id: 100,
    head: '0',
  }, (err) => {
    if (err) {
      logger.error('Unable to set initial HEAD data', err);
    }
    logger.warn('Initial HEAD position set because none was found');
  });
}

Metadata.find({}, async (err, doc) => {
  if (!doc.length) {
    await setInitialData();
  }
});

export async function setHead(head) {
  Metadata.findOneAndUpdate({ _id: 100 }, {
    _id: 100,
    head,
  }, {
    useFindAndModify: false,
    upsert: true,
  }, (err) => {
    if (err) logger.error('Unable to set HEAD', err);
  });
}

export default Metadata;
