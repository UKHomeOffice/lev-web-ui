'use strict';

const SearchService = require('./SearchService');

class BirthSearchService extends SearchService {

  static processRecord(record) {

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

module.exports = BirthSearchService;
