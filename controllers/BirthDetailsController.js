'use strict';

const BaseController = require('./BaseController');
const { searchById } = require('../api');

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
          record = await searchById({
            ...this.getOptions(req),
            url: `/v1/registration/birth/${systemNumber}`
          });
        }
      } else {

        // No id param exists, display currentRecord
        const currentRecord = req.sessionModel.get('currentRecord');
        record = searchResults[currentRecord];
      }

      if (record) {
        locals.record = this.processRecord(record);
        locals.showBackToResults = searchResults.length > 1;
      }

      callback(null, locals);
    });
  }

  processRecord(record) {

    // Status is blocked
    if (record.status.blocked) {
      return {
        ...record,
        flags: {
          refer: true
        }
      };
    }

    // Status is not blocked, populate flags
    const refer =
      record.status.blocked ||
      record.status.cancelled ||
      record.status.potentiallyFictitious ||
    (
      record.status.reregistration !== 'None' &&
      record.status.reregistration !== 'Father added' &&
      record.status.reregistration !== 'Subsequently married' &&
      record.status.reregistration !== 'Father modified' &&
      record.status.reregistration !== 'Replacement registration'
    ) ||
    (
      record.status.marginalNote !== 'None' &&
      record.status.marginalNote !== 'Court order in place' &&
      record.status.marginalNote !== 'Court order revoked'
    );

    return {
      ...record,
      flags: {
        refer,
        fatherAdded: record.status.reregistration === 'Father added',
        subsequentlyMarried: record.status.reregistration === 'Subsequently married',
        fatherModified: record.status.reregistration === 'Father modified',
        replaced: record.status.reregistration === 'Replacement registration',
        corrected: record.status.correction && record.status.correction !== 'None',
        courtOrderInPlace: record.status.marginalNote === 'Court order in place',
        courtOrderRevoked: record.status.marginalNote === 'Court order revoked'
      }
    };
  }
}

module.exports = BirthDetailsController;
