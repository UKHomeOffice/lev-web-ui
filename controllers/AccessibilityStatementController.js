'use strict';

const BaseController = require("./BaseController");
const logger = require('hmpo-logger').get();

class AccessibilityStatementController extends BaseController {
  async getValues(req, _res, next) {
    try {
      const rawCookie = req.headers.cookie || '';
      const cookies = rawCookie.split(';').map(cookie => cookie.trim());
      console.log(cookies);
      const kcAccessPart = cookies.find(c => c.startsWith('kc-access='));

      let kcAccess = null;

      if(kcAccessPart) {
        kcAccess = kcAccessPart.split('=')[1];
      }

      console.log('kc_access:', kcAccess);
      req.sessionModel.set('loggedIn', !!kcAccess);
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