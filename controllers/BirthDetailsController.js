'use strict';

const BaseController = require('./BaseController');

class BirthDetailsController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);

      const systemNumber = req.params.id && parseInt(req.params.id) || undefined;

      if (systemNumber) {
        const searchResults = req.sessionModel.get('searchResults') || [];
        const currentRecord = searchResults.findIndex(record => record.id === systemNumber);

        if (currentRecord !== -1) {
          req.sessionModel.set('currentRecord', currentRecord);
        } else {
          req.sessionModel.unset('currentRecord');
        }
      }

      const searchResults = req.sessionModel.get('searchResults') || [];
      const currentRecord = req.sessionModel.get('currentRecord');

      locals.record = searchResults[currentRecord];
      locals.showBackToResults = searchResults.length > 1;

      callback(null, locals);
    });
  }
}

module.exports = BirthDetailsController;
