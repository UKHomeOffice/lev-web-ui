'use strict';

const { setup } = require('hmpo-app');
const birthRoute = require('./routes/birth');

const { router } = setup();

// routes
router.use('/', birthRoute);
router.use('/birth', birthRoute);

// healthz endpoint
router.use('/healthz', ((req, res) => {
  res.send('OK');
}));

// readiness endpoint
router.use('/readiness', (req, res) => {
  res.send('OK');
});
