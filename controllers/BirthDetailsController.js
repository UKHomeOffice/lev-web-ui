'use strict';

const BaseController = require('./BaseController');
const BirthSearchService = require('../services/BirthSearchService');
const requestOptions = require("../helpers/requestOptions");
const { api } = require("../config");
const { recordBuilder, formatDate } = require("../helpers/FlsSchemaHelper");
const fullDatasetFieldMapper = require("../lib/FullDatasetFieldMapper");
const { flsSchemaCache } = require("../helpers/flsSchemaCache");

class BirthDetailsController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, async (error, locals) => {
      if (error) return callback(error);

      const searchResults = req.sessionModel.get('searchResults') || [];
      let record;

      // If id param exists, use it to find record
      if (req.params.id) {

        // Check if searchResults contains systemNumber
        const systemNumber = parseInt(req.params.id);
        const currentRecord = searchResults.findIndex(record => record.id === systemNumber);

        if (currentRecord !== -1) {

          // Record found in searchResults, use it
          req.sessionModel.set('currentRecord', currentRecord);

          record = searchResults[currentRecord];
        } else {

          // Record not found in searchResults, call REST API
          record = await BirthSearchService.lookup({
            ...requestOptions(req, api),
            url: `/v1/registration/birth/${systemNumber}`
          });
        }
      } else {

        // No id param exists, display currentRecord
        const currentRecord = req.sessionModel.get('currentRecord');
        record = searchResults[currentRecord];
      }

      if (record) {
        const flsSchema = await flsSchemaCache(req);

        locals.record = recordBuilder(fullDatasetFieldMapper.birthV1, flsSchema?.birthV1, record);
        locals.record.previousRegistration = record.previousRegistration;
        locals.record.nextRegistration = record.nextRegistration;
        locals.record.flags = record.flags;
        locals.title = !record.status.blocked ? `${record.child.forenames} ${record.child.surname} ${formatDate(record.child.dateOfBirth)}` : "UNAVAILABLE"
        locals.showBackToResults = searchResults.length > 1;

        callback(null, locals);
      } else {
        callback(this.pageNotFound());
      }
    });
  }
}

module.exports = BirthDetailsController;