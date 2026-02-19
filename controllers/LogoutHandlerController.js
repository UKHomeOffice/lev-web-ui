'use strict';

const BaseController = require('./BaseController');

class LogoutHandlerController extends BaseController {

  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      const sessionTimeout = req.session.sessionTimeout || false;
      locals.sessionTimeout =  sessionTimeout;
      delete req.session.sessionTimeout;
      callback(null, locals);
    });
  }
}

module.exports = LogoutHandlerController;
