// /notes routes.  Used by routes/index.mjs.
import path from 'path';
import express from 'express';

export const router = express.Router();

// Fix for ReferenceError: __dirname is not defined in ES module scope
// https://github.com/nodejs/help/issues/2907
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// /Fix

// GET Route for notes page
router.get('/notes', async (req, res) => {
    console.log("NOTES PAGE: ", path.join(__dirname, '../public/notes.html'));
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});
