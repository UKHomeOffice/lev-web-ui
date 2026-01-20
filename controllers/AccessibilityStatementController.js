'use strict';

const BaseController = require("./BaseController");
const getCurrentUser = require("../helpers/getCurrentUser");
const logger = require('hmpo-logger').get();

class AccessibilityStatementController extends BaseController {
  async getValues(req, _res) {
    try {
      const username = await getCurrentUser(req);
      req.sessionModel.set('username', username);
    }
    catch (err) {
      logger.log('error', err);
    }
  }

  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);
      locals.username = req.sessionModel.get('username');

      callback(null, locals);
    });
  }
}

module.exports = AccessibilityStatementController;