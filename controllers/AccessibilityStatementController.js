'use strict';

const BaseController = require("./BaseController");
const logger = require('hmpo-logger').get();

class AccessibilityStatementController extends BaseController {
  async getValues(req, _res, next) {
    try {
      console.log("***REQ REFERER: " + req.get('referer'));

      const referer = req.get('referer');

      const loggedIn = !(referer.contains('keycloak-ho-hmpo') && !referer.endsWith('logout'));

      req.sessionModel.set('loggedIn', !!loggedIn);
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

      // console.log("***ACTIVE USERNAME: " + req.sessionModel.get('username'));
      console.log("***USERNAME: " + locals.username);
      console.log("***ACCESSIBILITY STATEMENT: " + locals.accessibilityStatement);

      console.log("***CONDITION 1: " + (locals.accessibilityStatement &&  !locals.loggedIn));
      console.log("***CONDITION 2: " + (!locals.accessibilityStatement || locals.loggedIn));
      callback(null, locals);
    });
  }
}

module.exports = AccessibilityStatementController;