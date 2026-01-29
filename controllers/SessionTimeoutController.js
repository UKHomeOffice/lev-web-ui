'use strict';

const BaseController = require('./BaseController');

class SessionTimeoutController extends BaseController {

  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      callback(null, locals);
    });
  }
}

module.exports = SessionTimeoutController;
