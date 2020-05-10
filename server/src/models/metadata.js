import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MetadataSchema = new Schema({
  _id: Number,
  head: String,
}, {
  _id: false,
});

const Metadata = mongoose.model('MetadataModel', MetadataSchema);

async function setHead(head) {
  Metadata.findOneAndUpdate({_id: 100}, {
    _id: 100,
    head: head,
  }, {
    useFindAndModify: false,
    upsert: true,
  }, function(err, res) {
    if (err) console.error('Error: Unable to set head', head, err);
  });
}

export { setHead };
export default Metadata;
