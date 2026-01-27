'use strict';

const BaseController = require("./BaseController");
const isUserLoggedIn = require("../helpers/isUserLoggedIn");
const logger = require('hmpo-logger').get();

class AccessibilityStatementController extends BaseController {
  async getValues(req, _res, next) {
    try {
      req.sessionModel.set('loggedIn', isUserLoggedIn(req));
    }
    catch (err) {
      logger.log('error', err);
    }
    next();
  }

  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);
      locals.loggedIn = req.sessionModel.get('loggedIn');
      locals.accessibilityStatement = true;
      callback(null, locals);
    });
  }
}

module.exports = AccessibilityStatementController;