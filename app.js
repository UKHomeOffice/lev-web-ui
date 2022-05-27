'use strict';

const { setup } = require('hmpo-app');
const { options } = require('./config');
const birthRoute = require('./routes/birth');
const deathRoute = require('./routes/death');

const { router } = setup(options);

// routes
router.use('/birth', birthRoute);
router.use('/death', deathRoute);
router.use('/', (req, res) => res.redirect('/birth'));
