// /api/* routes.  Called from / exported to /routes/api/index.mjs.

// GET /api/notes - returns all note objects from a file dbFile
// POST /api/notes - saves a note submitted in the POST request body
// DELETE /api/notes/{note ID} - deletes a note identified by note ID

import { readFromFile, writeToFile } from '../../helpers/fsUtils.mjs';
import { nanoid } from 'nanoid';

import express from 'express';

export const notes = express.Router();

const dbFile = './db/db.json';

// GET Route for retrieving all the notes
notes.get('/', async (req, res) => {
  console.log("GET NOTE");
  try {
    let data = await readFromFile(dbFile);
    // Examine all notes, and add a unique nanoid() if "id" doesn't exist
    let changed = false;
    let parsedata = JSON.parse(data).map((note) => {
      if (!note.id) {
        note.id = nanoid();
        changed = true;
      }
      return note;
    });
    console.log(changed, parsedata);
    // if we added any IDs, write to the file
    if (changed) {
      await writeToFile(dbFile, parsedata);
    };
    res.json(parsedata);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  };
});

// POST Route to save a note
notes.post('/', async (req, res) => {
  console.log("POST NOTE");
  try {
    let data = await readFromFile(dbFile);
    // Examine all notes, and add a unique nanoid() if "id" doesn't exist
    let found = false;

    // check the posted note for any missing data or add it
    let postednote = {};
    req.body.id ? postednote.id = req.body.id : postednote.id = nanoid();
    req.body.title ? postednote.title = req.body.title : postednote.title = "";
    req.body.text ? postednote.text = req.body.text : postednote.text = "";

    let parsedata = JSON.parse(data).map((note) => {
      if (!note.id) {
        note.id = nanoid();
      } else if (note.id === req.body.id) {
        // if a note ID already exists, modify it
        found = true;
        note = postednote;
      };
      return note;
    });
    console.log("note exists? ", found, parsedata);
    // if this is a new note, add it to the database
    if (!found) {
      parsedata.push(postednote);
    };
    await writeToFile(dbFile, parsedata);
    res.json(parsedata);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  };
});

// DELETE Route - delete a note based on note ID
notes.delete('/:id', async (req, res) => {
  console.log("DELETE NOTE");

  // check if the client sent a note ID
  if (!req.params.id) {
    res.status(404).json({ message: "Please specify an ID" });
    return false;

  } else {
    try {
      let data = await readFromFile(dbFile);
      // Examine all notes, and add a unique nanoid() if "id" doesn't exist
      let found = false;

      let parsedata = JSON.parse(data);
      let foundindex = parsedata.findIndex(element => element.id === req.params.id);
      console.log(`Found ${foundindex} to delete`);
      if (foundindex >= 0) {
        let deletednote = parsedata[foundindex];
        parsedata.splice(foundindex, 1);
        console.log("deleting note ", foundindex, deletednote.title);
        await writeToFile(dbFile, parsedata);
        res.status(200).json({ message: `Deleted note ${deletednote.title}` });
      } else {
        res.status(404).json({ message: `Note with ID ${req.params.id} not found` });
      }
    } catch (err) {
      console.log(err);
      res.status(404).json(err);
    };
  };
});
