import express from 'express';

const notes = express.Router();

notes.get('/tags', (req, res) => {
  res.json({ message: "TAGS" });
})

export default notes;
