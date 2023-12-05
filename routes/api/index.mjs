// /api routes. Imported to /routes/index.mjs Delegates all /api/notes routes to noteRoutes.mjs
import express from 'express';

export const router = express.Router();

import { notes as noteRoutes } from './noteRoutes.mjs';

router.use('/notes', noteRoutes);
