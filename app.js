'use strict';

const { setup } = require('hmpo-app');
const birthRoute = require('./routes/birth')

const { router } = setup();

// routes
router.use('/', birthRoute);
router.use('/birth', birthRoute);
