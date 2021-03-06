'use strict';

const BaseController = require('./BaseController');

class DeathResultsController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);
      locals.results = req.sessionModel.get('searchResults') || [];

      callback(null, locals);
    });
  }
}

module.exports = DeathResultsController;
