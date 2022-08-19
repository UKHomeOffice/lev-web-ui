'use strict';

const RestApiModel = require('../models/RestApiModel');

class SearchService {

  /**
   * Calls the REST API with the given options and returns an array of search results as a Promise.
   *
   * @param options
   * @returns {Promise<record>}
   */
  static async lookup(options) {
    return await new Promise((resolve, reject) => {
      const model = new RestApiModel({}, options);
      model.fetch((err, data, _responseTime) => {
        if (err && err.status === 404) {
          resolve(undefined);
        } else if (err) {
          reject(err);
        } else {
          resolve(this.processRecord(data));
        }
      });
    });
  }

  /**
   * Calls the REST API with the given options and returns an array of search results as a Promise.
   *
   * @param options
   * @returns {Promise<[record]>}
   */
  static async search(options) {
    return await new Promise((resolve, reject) => {
      const model = new RestApiModel({}, options);
      model.fetch((err, data, _responseTime) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.map(record => this.processRecord(record)));
        }
      });
    });
  }

  /**
   * Transform/decorate the record with additional properties
   *
   * @param record
   * @returns {record}
   */
  static processRecord(record) {
    return record;
  }
}

module.exports = SearchService;
