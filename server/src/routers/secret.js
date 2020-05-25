import express from 'express';
import updateMongo from '../bin/updateMongo';
import logger from '../utils/logger';

const secret = express.Router();

/*
 * GET - Update MongoDB from an API call
 */
secret.get('/updateMongo', async (req, res) => {
  try {
    await updateMongo();

    return res.status(200).json({
      status: 'OK',
    });
  } catch (err) {
    logger.error(err.message, err.stack);
    return res.status(400).json({
      status: 'failure',
      errors: [err.stack],
    });
  }
});

export default secret;
