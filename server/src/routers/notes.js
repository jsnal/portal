import express from 'express';
import { body, validationResult } from 'express-validator';
import Note from '../models/notes';

const notes = express.Router();

function checkInputError(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'failure',
      status: 422,
      errors: errors.array(),
    });
    return true;
  }
  return false;
}

/*
 * GET - Total note count
 */
notes.get('/getNoteCount', async (req, res) => {
  res.json({
    notes: await Note.countDocuments().exec(),
  });
});

/*
 * GET - All notes currently registered
 */
notes.get('/getAllNotes', async (req, res) => {
  res.json(await Note.find());
});

/*
 * POST - Get a note by a specific blob hash
 */
notes.post('/getNoteByBlobHash', [
  body('blobHash')
    .trim()
    .not()
    .isEmpty()
    .withMessage('blobHash can not be empty')
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage('blobHash must be alphanumeric only'),
], async (req, res) => {
  if (checkInputError(req, res)) return null;

  try {
    const note = await Note.find({ blobHash: req.body.blobHash }).exec().then((rNote) => rNote[0]);
    if (note.length === 0 || note == null) {
      throw `unable to find blobHash ${req.body.blobHash}`;
    }

    res.status(200).json(note);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: 'failure',
      errors: err,
    });
  }
});

notes.post('/getNotesByGroup', [
  body('group'),
]);

export default notes;
