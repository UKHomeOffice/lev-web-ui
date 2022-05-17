'use strict';

const BirthDetailsController = require('./BirthDetailsController');

class TestController extends BirthDetailsController {
  locals(req, res, callback) {
    const systemNumber = req.params.id && parseInt(req.params.id) || undefined;

    if (systemNumber) {
      const searchResults = req.sessionModel.get('searchResults') || [];
      const currentRecord = searchResults.findIndex(record => record.id === systemNumber);

      if (currentRecord !== -1) {
        req.sessionModel.set('currentRecord', currentRecord);
      } else {
        req.sessionModel.unset('currentRecord');
      }

      super.locals(req, res, callback);
    }
  }
}

module.exports = TestController;
