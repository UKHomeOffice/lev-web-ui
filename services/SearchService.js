'use strict';

const RestApiModel = require('../models/RestApiModel');

class SearchService {

  /**
   * Calls the REST API with the given options and returns an array of search results as a Promise.
   *
   * @param options
   * @returns {Promise<record>}
   */
  static async searchById(options) {
    return await new Promise((resolve, reject) => {
      const model = new RestApiModel({}, options);
      model.fetch((err, data, _responseTime) => {
        if (err && err.status === 404) {
          resolve(undefined);
        } else if (err) {
          reject(err);
        } else {
          resolve(data);
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
  static async searchByName(options) {
    return await new Promise((resolve, reject) => {
      const model = new RestApiModel({}, options);
      model.fetch((err, data, _responseTime) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = SearchService;
