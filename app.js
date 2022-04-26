'use strict';

const { setup } = require('hmpo-app');
const birthRoute = require('./routes/birth');
const deathRoute = require('./routes/death');

const { router } = setup();

// routes
router.use('/', birthRoute);
router.use('/birth', birthRoute);
router.use('/death', deathRoute);
