'use strict';

const DateController = require('./DateController');

class UserActivityResultsController extends DateController {
  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);
      locals.results = req.sessionModel.get('searchResults') || [];

      callback(null, locals);
    });
  }
}

module.exports = UserActivityResultsController;
