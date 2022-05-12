'use strict';

const { Controller } = require('hmpo-form-wizard');

class BirthDetailsController extends Controller {
  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);

      const searchResults = req.sessionModel.get('searchResults');
      const currentResult = req.sessionModel.get('currentRecord');

      locals.record = searchResults[currentResult];

      callback(null, locals);
    });
  }
}

module.exports = BirthDetailsController;
