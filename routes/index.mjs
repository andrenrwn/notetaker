// / routes. Delegates /api/* and /* routes to /api/index.mjs and /defaultroutes.mjs
import express from 'express';

// note due to conversion to ES6 module format, we need to use aliases to import router exports, ie. apiRoutes and defaultRoutes.
import { router as apiRoutes } from './api/index.mjs';
import { router as defaultRoutes } from './defaultroutes.mjs';

export const router = express.Router();

// https://expressjs.com/en/api.html#req
// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function (req, res, next) {
  console.log('%s %s %s === ROUTE LOG ===', req.method, req.url, req.path);
  next();
});

router.use('/api', apiRoutes);
router.use('/', defaultRoutes);


