'use strict';

const LogoutHandlerController = require('../../controllers/LogoutHandlerController');
const wizard = require('hmpo-form-wizard');

module.exports = wizard({
  '/': {
    entryPoint: true,
    controller: LogoutHandlerController
  },
}, {}, {
  name: 'logout-handler',
  templatePath: 'pages/logout-handler'
});
