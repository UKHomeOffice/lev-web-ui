'use strict';

const BaseController = require('./BaseController');
const DeathSearchService = require('../services/DeathSearchService');
const requestOptions = require("../helpers/requestOptions");
const { api } = require("../config");
const { flsSchemaCache } = require("../helpers/flsSchemaCache");
const { formatDate } = require("../helpers/FlsSchemaHelpers");
const { recordRowsBuilder } = require("../helpers/recordRowsBuilder");
const fullDatasetFieldMapper = require("../lib/FullDatasetFieldMapper");

class DeathDetailsController extends BaseController {
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
          record = await DeathSearchService.lookup({
            ...requestOptions(req, api),
            url: `/v1/registration/death/${systemNumber}`
          });
        }
      } else {

        // No id param exists, display currentRecord
        const currentRecord = req.sessionModel.get('currentRecord');
        record = searchResults[currentRecord];
      }

      if (record) {
        const flsSchema = await flsSchemaCache(req);

        locals.record = recordRowsBuilder(fullDatasetFieldMapper.death, flsSchema?.death, record);
        locals.record.previousRegistration = record.previousRegistration;
        locals.record.nextRegistration = record.nextRegistration;
        locals.record.flags = record.flags;
        locals.title = !record.status.blocked ? `${record.deceased.forenames} ${record.deceased.surname} ${formatDate(record.deceased.dateOfBirth)}` : "UNAVAILABLE"
        locals.showBackToResults = searchResults.length > 1;

        callback(null, locals);
      } else {
        callback(this.pageNotFound());
      }
    });
  }
}

module.exports = DeathDetailsController;
