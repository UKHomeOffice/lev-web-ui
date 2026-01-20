'use strict'

const AccessibilityStatementController = require("../../controllers/AccessibilityStatementController");

module.exports = {
  '/accessibility-statement': {
    entryPoint: true,
    controller: AccessibilityStatementController,
    template: '/index.html'
  }
}