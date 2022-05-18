'use strict';

const BaseController = require('./BaseController');

class BirthDetailsController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);

      const systemNumber = req.params.id && parseInt(req.params.id) || undefined;
      const searchResults = req.sessionModel.get('searchResults') || [];

      // If param exists
      if (systemNumber) {
        const currentRecord = searchResults.findIndex(record => record.id === systemNumber);

        req.sessionModel.set('currentRecord', currentRecord);
      }

      const currentRecord = req.sessionModel.get('currentRecord');

      locals.record = searchResults[currentRecord];
      locals.showBackToResults = searchResults.length > 1;

      callback(null, locals);
    });
  }
}

module.exports = BirthDetailsController;
