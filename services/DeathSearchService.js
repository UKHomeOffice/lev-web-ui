'use strict';

const SearchService = require('./SearchService');

class DeathSearchService extends SearchService {

  static processRecord(record) {
    return {
      ...record,
      flags: {
        refer: record.status.blocked || (record.status.marginalNote && record.status.marginalNote !== 'None'),
        corrected: record.status.correction && record.status.correction !== 'None'
      }
    };
  }
}

module.exports = DeathSearchService;
