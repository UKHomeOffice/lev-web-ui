'use strict';

const BaseController = require('./BaseController');

class BirthDetailsController extends BaseController {
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
