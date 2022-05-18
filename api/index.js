'use strict';

const RestApiModel = require('../models/RestApiModel');

/**
 * Calls the REST API with the given options and returns an array of search results as a Promise.
 *
 * @param options
 * @returns {Promise<[]>}
 */
async function searchById(options) {
  return await new Promise((resolve, reject) => {
    const model = new RestApiModel({}, options);
    model.fetch((err, data, _responseTime) => {
      if (err && err.status === 404) {
        resolve([]);
      } else if (err) {
        reject(err);
      } else {
        resolve([data]);
      }
    });
  });
}

/**
 * Calls the REST API with the given options and returns an array of search results as a Promise.
 *
 * @param options
 * @returns {Promise<[]>}
 */
async function searchByName(options) {
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

module.exports = {
  searchById,
  searchByName
};
