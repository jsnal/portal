import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
  title: String,
  tags: Array,
  createdAt: String,
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  blobHash: String,
  html: String,
  extension: String,
});

export default mongoose.model('NotesModel', NotesSchema);
