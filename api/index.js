'use strict';

const RestApiModel = require('../models/RestApiModel');

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
