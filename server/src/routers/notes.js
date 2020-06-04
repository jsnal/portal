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
    if (note !== Object(note) || !Object.keys(note).length) {
      throw new Error(`Unable to find blobHash ${req.body.blobHash}`);
    }

    return res.status(200).json(note);
  } catch (err) {
    logger.error(err.message, err.stack);
    return res.status(400).json({
      message: 'failure',
      errors: [err.stack],
    });
  }
});

/*
 * POST - Get a note by a specific title
 */
notes.post('/getNoteByTitle', [
  body('title')
    .trim()
    .not()
    .isEmpty()
    .withMessage('title can not be empty'),
], async (req, res) => {
  if (checkInputError(req, res)) return null;

  try {
    // Get the correct object based soley on the title
    const note = await Note.find({
      title: new RegExp(`^${req.body.title.replace(/-/g, ' ')}$`, 'i'),
    })
      .exec()
      .then((rNote) => rNote[0]);

    if (note !== Object(note) || !Object.keys(note).length) {
      throw new Error(`Unable to find title ${req.body.blobHash}`);
    }

    return res.status(200).json(note);
  } catch (err) {
    logger.error(err.message, err.stack);
    return res.status(400).json({
      message: 'failure',
      errors: [err.stack],
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
  body('perGroup')
    .trim()
    .not()
    .isEmpty()
    .withMessage('perGroup can not be empty')
    .matches(/^[0-9]+$/)
    .withMessage('perGroup must be number only'),
], async (req, res) => {
  if (checkInputError(req, res)) return null;

  const perGroup = Number(req.body.perGroup) || 5;
  const noteDocuments = await Note.countDocuments().exec();
  const maxGroups = Math.ceil(noteDocuments / perGroup);

  // If the number is anything over the max throw an error
  if (Number(req.body.group) > maxGroups) {
    return res.status(400).json({
      message: 'failure',
      errors: [`${req.body.group} is not a valid group`],
    });
  }

  try {
    const sortedNotes = await Note.find({})
      .sort({ updatedAt: -1 })
      .skip((perGroup * req.body.group) - perGroup)
      .limit(perGroup)
      .exec();

    if (!Array.isArray(sortedNotes) || !sortedNotes.length) {
      throw new Error(`Unable to find group ${req.body.group}`);
    }

    return res.status(200).json(sortedNotes);
  } catch (err) {
    logger.error(err.message, err.stack);
    return res.status(400).json({
      message: 'failure',
      errors: [err.stack],
    });
  }
});

export default notes;
