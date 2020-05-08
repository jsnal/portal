import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
  title: String,
  tags: Array,
  createdAt: String,
  blobHash: String,
  headHash: String,
  content: String,
});

export default mongoose.model('NotesModel', NotesSchema);
