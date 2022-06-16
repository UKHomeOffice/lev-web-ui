'use strict';

const SearchService = require('./SearchService');

class PartnershipSearchService extends SearchService {

  static processRecord(record) {
    console.log(record);

    return {
      ...record,
      flags: {
        refer: record.status.blocked || (record.status.marginalNote && record.status.marginalNote !== 'None')
      }
    };
  }
}

module.exports = PartnershipSearchService;
