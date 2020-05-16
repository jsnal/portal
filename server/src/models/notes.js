import mongoose from 'mongoose';

const { Schema } = mongoose;

const NotesSchema = new Schema({
  title: String,
  tags: Array,
  createdAt: Date,
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  blobHash: String,
  html: String,
  extension: String,
});

export default mongoose.model('NotesModel', NotesSchema);
