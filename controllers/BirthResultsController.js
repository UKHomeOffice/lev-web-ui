'use strict';

const { Controller } = require('hmpo-form-wizard');

class BirthResultsController extends Controller {
  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);

      locals.results = req.sessionModel.get('searchResults');

      callback(null, locals);
    });
  }
}

module.exports = BirthResultsController;
