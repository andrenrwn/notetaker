import express from 'express';

import { router as apiRoutes } from './api/index.mjs';
import { router as defaultRoutes } from './defaultroutes.mjs';
import diagnostics from './diagnostics.mjs';

export const router = express.Router();

// import express from 'express';

// import { router as apiRoutes } from './api/index.mjs';
// import { router as defaultRoutes } from './defaultroutes.mjs';
// import diagnostics from './diagnostics.mjs';

// export const router = express.Router();


// https://expressjs.com/en/api.html#req
// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function (req, res, next) {
  console.log('%s %s %s === ROUTE LOG ===', req.method, req.url, req.path);
  next();
});

// router.use(function (req, res, next) {
//   console.log('%s %s %s === ROUTE LOG ===', req.method, req.url, req.path);
//   next();
// });

router.use('/api', apiRoutes);
router.use('/', defaultRoutes);
router.use('/diag', diagnostics);


