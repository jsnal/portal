import mongoose from 'mongoose';

const { Schema } = mongoose;

const MetadataSchema = new Schema({
  _id: Number,
  head: String,
}, {
  _id: false,
});

const Metadata = mongoose.model('MetadataModel', MetadataSchema);

export async function setHead(head) {
  Metadata.findOneAndUpdate({ _id: 100 }, {
    _id: 100,
    head,
  }, {
    useFindAndModify: false,
    upsert: true,
  }, (err) => {
    if (err) console.error('Error: Unable to set head', head, err);
  });
}

export default Metadata;
