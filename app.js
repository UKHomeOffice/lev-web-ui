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
const accessibilityStatement = require('./routes/accessibility-statement');
const syops = require('./routes/syops');
const OrganisationRestApiModel = require("./models/OrganisationRestApiModel");
const config = require("./config");
const {syopsAcceptanceCheck} = require("./middleware/syopsAcceptanceCheck");
const { router } = setup(options);

// routes for static assets
router.use('/access-test', accessTest);
router.use('/accessibility-statement', accessibilityStatement);
router.use('/syops', syops);

// middleware to check syops acceptance
router.use((req, res, next) => syopsAcceptanceCheck(req, res, next));

// routes
router.use('/birth', birthRoute);
router.use('/death', deathRoute);
router.use('/marriage', marriageRoute);
router.use('/partnership', partnershipRoute);
router.use('/metrics', metricsRoute);
router.use('/audit/user-activity', userActivityRoute);
router.use('/admin/organisations', organisationsRoute);
router.use('/', (req, res) => res.redirect('/birth'));
