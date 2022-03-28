'use strict';

const { setup } = require('hmpo-app');
const { router } = setup();

// routes
router.use('/', require('./routes/birth'));
router.use('/birth', require('./routes/birth'));
