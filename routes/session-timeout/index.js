'use strict';

const SessionTimeoutController = require('../../controllers/SessionTimeoutController');
const wizard = require('hmpo-form-wizard');

module.exports = wizard({
  '/': {
    entryPoint: true,
    controller: SessionTimeoutController
  },
}, {}, {
  name: 'session-timeout',
  templatePath: 'pages/session-timeout'
});
