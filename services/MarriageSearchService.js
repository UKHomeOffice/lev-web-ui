'use strict';

const SearchService = require('./SearchService');

class MarriageSearchService extends SearchService {

  static processRecord(record) {
    return {
      ...record,
      flags: {
        refer: record.status.blocked || (record.status.marginalNote && record.status.marginalNote !== 'None')
      }
    };
  }
}

module.exports = MarriageSearchService;
