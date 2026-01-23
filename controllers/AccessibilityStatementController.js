'use strict';

const BaseController = require("./BaseController");
const logger = require('hmpo-logger').get();
const { jwtDecode } = require("jwt-decode");

class AccessibilityStatementController extends BaseController {
  async getValues(req, _res, next) {
    try {
      console.log("***REQ: ", req);
      console.log("***REQ HEADERS: ", req.headers);

      const authorizationHeader = req.headers.authorization;
      const accessToken = authorizationHeader ? authorizationHeader.split(' ')[1] : '';

      const decodedToken = jwtDecode(accessToken);
      const username = decodedToken.preferred_username;

      req.sessionModel.set('username', username);
    }
    catch (err) {
      logger.log('error', err);
    }
    next();
  }

  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);
      // locals.username = req.sessionModel.get('username') !== '';
      locals.accessibilityStatement = true;

      // console.log("***ACTIVE USERNAME: " + req.sessionModel.get('username'));
      console.log("***USERNAME: " + locals.username);
      console.log("***ACCESSIBILITY STATEMENT: " + locals.accessibilityStatement);

      console.log("***CONDITION 1: " + (locals.accessibilityStatement &&  !locals.username));
      console.log("***CONDITION 2: " + (!locals.accessibilityStatement || locals.username));
      callback(null, locals);
    });
  }
}

module.exports = AccessibilityStatementController;