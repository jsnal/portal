import express from 'express';
import { body, validationResult } from 'express-validator';
import logger from '../utils/logger';
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
  res.json(await Note.find({}).sort({ createdAt: -1 }).exec());
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
    if (typeof note === 'undefined' || note == null) {
      throw new Error(`unable to find blobHash ${req.body.blobHash}`);
    }

    return res.status(200).json(note);
  } catch (err) {
    logger.error(err);
    return res.status(400).json({
      message: 'failure',
      errors: err,
    });
  }
});

/*
 * POST - Get sorted notes by group (pagination)
 */
notes.post('/getNotesByGroup', [
  body('group')
    .trim()
    .not()
    .isEmpty()
    .withMessage('group can not be empty')
    .matches(/^[0-9]+$/)
    .withMessage('group must be number only'),
  // TODO: Check if it an int but keep it optional
  body('perPage'),
], async (req, res) => {
  if (checkInputError(req, res)) return null;

  const perPage = Number(req.body.perPage) || 7;
  const noteDocuments = await Note.countDocuments().exec();

  if (req.body.group > Math.ceil(noteDocuments / perPage)) {
    return res.status(400).json({
      message: `${req.body.group} is not a valid group`,
    });
  }

  try {
    const sortedNotes = await Note.find({})
      .sort({ createdAt: -1 })
      .skip((perPage * req.body.group) - perPage)
      .limit(perPage)
      .exec();

    if (!Array.isArray(sortedNotes) || !sortedNotes.length) {
      throw new Error(`unable to find group ${req.body.group}`);
    }

    return res.status(200).json(sortedNotes);
  } catch (err) {
    logger.error(err);
    return res.status(400).json({
      message: 'failure',
      errors: err,
    });
  }
});

export default notes;
