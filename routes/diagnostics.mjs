import express from 'express';
export const diagnostics = express.Router();
import { nanoid } from 'nanoid';

// const { v4: uuidv4 } = require('uuid');
import { readAndAppend, readFromFile } from '../helpers/fsUtils.mjs';

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  readFromFile('./db/diagnostics.json').then((data) =>
    res.json(JSON.parse(data))
  );
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  console.log(req.body);

  const { isValid, errors } = req.body;

  const payload = {
    time: Date.now(),
    error_id: nanoid(),
    errors,
  };

  if (!isValid) {
    readAndAppend(payload, './db/diagnostics.json');
    res.json(`Diagnostic information added 🔧`);
  } else {
    res.json({
      message: 'Object is valid, not logging. Check front end implementation',
      error_id: payload.error_id,
    });
  }
});

export default diagnostics;