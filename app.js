'use strict';

const { setup } = require('hmpo-app');
const { options} = require('./config');
const homeRoute = require('./routes/home');
const birthRoute = require('./routes/birth');
const deathRoute = require('./routes/death');
const marriageRoute = require('./routes/marriage');
const partnershipRoute = require('./routes/partnership');
const metricsRoute = require('./routes/metrics');
const organisationsRoute = require('./routes/organisation');
const serviceNotificationRoute = require('./routes/service-notification');
const accessTest = require('./routes/access-test');
const accessibilityStatement = require('./routes/accessibility-statement');
const syops = require('./routes/syops');
const { healthCheck } = require('./routes/health');
const { syopsAcceptanceCheck } = require("./middleware/syopsAcceptanceCheck");
const { router, app } = setup(options);
const nunjucksEnv = app.get('nunjucksEnv');

nunjucksEnv.addFilter('relativeDateTime', require('./filters/relativeDateTimeFilter'));
nunjucksEnv.addGlobal('displayFeedbackBanner', require('./helpers/feedbackBanner'));
nunjucksEnv.addGlobal('feedbackContentHtml', process.env.FEEDBACK_CONTENT_HTML);
nunjucksEnv.addGlobal('govukRebrand', true);

router.use((req, res, next) => {
  if(!req.url.toLowerCase().includes('syops') && !req.url.toLowerCase().includes('metrics') && !req.url.toLowerCase().includes('access-test') && !req.url.toLowerCase().includes('public') && !req.url.toLowerCase().includes('assets')) {
    req.session.originalRequestUrl = req.originalUrl;
  }
  next();
});

router.use((req, res, next) => {
  res.locals.liveNotification = req.session.liveNotification || null;
  next();
});

// routes for static assets
router.use('/access-test', accessTest);
router.use('/accessibility-statement', accessibilityStatement);
router.use('/health', healthCheck);
router.use('/syops', syops);
router.use('/metrics', metricsRoute);

// middleware to check syops acceptance
router.use((req, res, next) => syopsAcceptanceCheck(req, res, next));

// routes
router.use('/birth', birthRoute);
router.use('/death', deathRoute);
router.use('/marriage', marriageRoute);
router.use('/partnership', partnershipRoute);
router.use('/admin/organisations', organisationsRoute);
router.use('/admin/notify-users', serviceNotificationRoute);
router.use('/', homeRoute);
