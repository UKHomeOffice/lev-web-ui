'use strict';

const wizard = require('hmpo-form-wizard');
const AccessibilityStatementController = require("../../controllers/AccessibilityStatementController");

module.exports = wizard({
  '/': {
    entryPoint: true,
    controller: AccessibilityStatementController,
  }
}, {}, {
  name: 'accessibility-statement',
  templatePath: 'pages/accessibility-statement'
});
