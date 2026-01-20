'use strict';

const wizard = require('hmpo-form-wizard');
const BaseController = require("../../controllers/BaseController");

module.exports = wizard({
  '/': {
    entryPoint: true,
    controller: BaseController,
  }
}, {}, {
  name: 'accessibility-statement',
  templatePath: 'pages/accessibility-statement'
});
