'use strict';

const BaseController = require('./BaseController');

class PartnershipResultsController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);
      locals.results = req.sessionModel.get('searchResults') || [];

      callback(null, locals);
    });
  }
}

module.exports = PartnershipResultsController;
