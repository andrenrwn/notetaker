import path from 'path';
import express from 'express';

import { router as routes } from './routes/index.mjs';

// Fix for ReferenceError: __dirname is not defined in ES module scope
// https://github.com/nodejs/help/issues/2907
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// /fix

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.listen(PORT, () => console.log('Now listening on port', PORT));
