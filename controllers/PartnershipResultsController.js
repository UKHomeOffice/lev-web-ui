'use strict';

const BaseController = require('./BaseController');
const { flsSchemaCache } = require("../helpers/flsSchemaCache");
const { recordSummaryFilter } = require("../helpers/recordSummaryFilter");

class PartnershipResultsController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, async (error, locals) => {
      if (error) return callback(error);

      const results = req.sessionModel.get('searchResults');
      let flsFilteredRecords;
      if (results) {

        const flsSchema = (await flsSchemaCache(req))?.flsSchema;

        flsFilteredRecords = results.map(record => {
          return recordSummaryFilter(flsSchema?.partnership, record);
        });
      }

      locals.results = flsFilteredRecords || [];

      callback(null, locals);
    });
  }
}

module.exports = PartnershipResultsController;
