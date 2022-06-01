'use strict';

const SearchService = require('./SearchService');

class DeathSearchService extends SearchService {

  static async searchById(options) {
    const record = await super.searchById(options);

    console.log(record);

    return record ? this.processRecord(record) : undefined;
  }

  static async searchByName(options) {
    const searchResults = await super.searchByName(options);

    return searchResults.map(record => this.processRecord(record));
  }

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
