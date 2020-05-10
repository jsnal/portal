import express from 'express';
import Note from '../models/notes';

const notes = express.Router();

notes.get('/tags', (req, res) => {
  res.json({ message: "TAGS" });
})

// This is a test
notes.get('/getContent', async (req, res) => {
  const html = await Note.find({blobHash: 'add6c48ec844252f646c63dd838f28ef4913aeb0'})
  res.send(html[0].html);
});

export default notes;
