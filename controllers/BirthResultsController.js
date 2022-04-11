const Controller = require('hmpo-form-wizard').Controller;

class BirthResultsController extends Controller {
  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);

      locals.searchResults = '3 records found for Tester MULTIPLE 01/01/2010';

      callback(null, locals);
    });
  }
}

module.exports = BirthResultsController;
