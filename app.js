'use strict';

const { setup } = require('hmpo-app');
const { options} = require('./config');
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
const { syopsAcceptanceCheck } = require("./middleware/syopsAcceptanceCheck");
const { router } = setup(options);
let originalRequestUrl = '';

router.use((req, res, next) => {
  if(!req.url.toLowerCase().includes('syops') && !req.url.toLowerCase().includes('syops')) {
    originalRequestUrl = req.url;
  }
  req.originalRequestUrl = originalRequestUrl
  next();
});

// routes for static assets
router.use('/access-test', accessTest);
router.use('/accessibility-statement', accessibilityStatement);
router.use('/syops', syops);
router.use('/metrics', metricsRoute);

// middleware to check syops acceptance
router.use((req, res, next) => syopsAcceptanceCheck(req, res, next));

// routes
router.use('/birth', birthRoute);
router.use('/death', deathRoute);
router.use('/marriage', marriageRoute);
router.use('/partnership', partnershipRoute);
router.use('/audit/user-activity', userActivityRoute);
router.use('/admin/organisations', organisationsRoute);
router.use('/', (req, res) => res.redirect('/birth'));
