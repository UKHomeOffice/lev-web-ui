'use strict';

const BaseController = require('./BaseController');
const PartnershipSearchService = require('../services/PartnershipSearchService');
const requestOptions = require("../helpers/requestOptions");
const { api } = require("../config");
const { recordRowsBuilder } = require("../helpers/recordRowsBuilder");
const fullDatasetFieldMapper = require("../lib/FullDatasetFieldMapper");
const { flsSchemaCache } = require("../helpers/flsSchemaCache");

class PartnershipDetailsController extends BaseController {
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
          record = await PartnershipSearchService.lookup({
            ...requestOptions(req, api),
            url: `/v1/registration/partnership/${systemNumber}`
          });
        }
      } else {

        // No id param exists, display currentRecord
        const currentRecord = req.sessionModel.get('currentRecord');
        record = searchResults[currentRecord];
      }

      if (record) {
        const flsSchema = (await flsSchemaCache(req))?.flsSchema;

        locals.record = recordRowsBuilder(fullDatasetFieldMapper.partnership, flsSchema?.partnership, record);
        locals.record.previousRegistration = record.previousRegistration;
        locals.record.nextRegistration = record.nextRegistration;
        locals.record.flags = record.flags;

        const hasCompletePartnershipDetails = record?.partner2?.forenames && record?.partner2?.surname && record?.partner1?.forenames && record?.partner1?.surname;

        locals.title = (!record?.status?.blocked && hasCompletePartnershipDetails)
          ? `${record.partner2.forenames} ${record.partner2.surname} & ${record.partner1.forenames} ${record.partner1.surname}`
          : "UNAVAILABLE";

        locals.showBackToResults = searchResults.length > 1;

        callback(null, locals);
      } else {
        callback(this.pageNotFound());
      }
    });
  }
}

module.exports = PartnershipDetailsController;
