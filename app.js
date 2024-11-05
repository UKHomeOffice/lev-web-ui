'use strict';

// until internal app is deployed, this ensures all functionality across user management and will be removed once separate apps
process.env.IS_EXTERNAL = 'false';

const { setup } = require('hmpo-app');
const { options } = require('./config');
const birthRoute = require('./routes/birth');
const deathRoute = require('./routes/death');
const marriageRoute = require('./routes/marriage');
const partnershipRoute = require('./routes/partnership');
const metricsRoute = require('./routes/metrics');
const userActivityRoute = require('./routes/user-activity');
const organisationsRoute = require('./routes/organisation');
const accessTest = require('./routes/access-test');

const { router } = setup(options);

// routes
router.use('/birth', birthRoute);
router.use('/death', deathRoute);
router.use('/marriage', marriageRoute);
router.use('/partnership', partnershipRoute);
router.use('/metrics', metricsRoute);
router.use('/audit/user-activity', userActivityRoute);
router.use('/admin/organisations', organisationsRoute);
router.use('/access-test', accessTest);
router.use('/', (req, res) => res.redirect('/birth'));
