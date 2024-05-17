'use strict';

const OrganisationRestApiModel = require('../../models/OrganisationRestApiModel');

class OrganisationSearchService {

  /**
   * Calls the IAM REST API with the given options and returns results as a Promise.
   *
   // * @returns {Promise<string>}
   */

  static async orgLookup(options) {
    return await new Promise((resolve, reject) => {
      const model = new OrganisationRestApiModel({}, options);
      model.fetch((err, data, _responseTime) => {
        if (err && (err.status === 404 || err.status === 400)) {
          resolve(undefined);
        } else if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = OrganisationSearchService;
