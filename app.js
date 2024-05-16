'use strict';

const { setup } = require('hmpo-app');
const { options } = require('./config');
const birthRoute = require('./routes/birth');
const deathRoute = require('./routes/death');
const marriageRoute = require('./routes/marriage');
const partnershipRoute = require('./routes/partnership');
const metricsRoute = require('./routes/metrics');
const userActivityRoute = require('./routes/user-activity');
const organisationsRoute = require('./routes/organisations');

const { router } = setup(options);

// routes
router.use('/birth', birthRoute);
router.use('/death', deathRoute);
router.use('/marriage', marriageRoute);
router.use('/partnership', partnershipRoute);
router.use('/metrics', metricsRoute);
router.use('/audit/user-activity', userActivityRoute);
router.use('/admin/organisations', organisationsRoute);
router.use('/', (req, res) => res.redirect('/birth'));
