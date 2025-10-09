'use strict';

const OrganisationRestApiModel = require("../models/OrganisationRestApiModel");

class ServiceNotificationsService {
  /**
   * Calls the IAM REST API with the given options and returns results as a Promise.
   *
   // * @returns {Promise<string>}
   */

  static async getRequest(options) {
    return await new Promise((resolve, reject) => {
      const model = new OrganisationRestApiModel({}, options);
      model.fetch((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = ServiceNotificationsService;