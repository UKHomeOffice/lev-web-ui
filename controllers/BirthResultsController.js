'use strict';

const BirthController = require('./BirthController');

class BirthResultsController extends BirthController {
  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);

      const results = req.sessionModel.get('searchResults') || [];

      locals.results = results.map(record => this.processRecord(record));

      callback(null, locals);
    });
  }
}

module.exports = BirthResultsController;
