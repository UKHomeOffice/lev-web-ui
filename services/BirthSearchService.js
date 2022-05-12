'use strict';

const logger = require('hmpo-app').logger.get('birth-search-service');
const RestApiModel = require('../models/RestApiModel');

class BirthSearchService {

  static searchById(attributes, options, callback) {

    const model = new RestApiModel(attributes, options);

    model.fetch((err, data, _responseTime) => {
      if (err) {
        logger.error(err);
        if (err.status === 404) {
          callback([]);
        }
        return;
      }

      logger.info(data);
      callback([data]);
    });
  }

  static searchByName(attributes, options, callback) {
    const model = new RestApiModel(attributes, options);

    model.fetch((err, data, _responseTime) => {
      if (err) return logger.error(err);

      logger.info(data);
      callback(data);
    });
  }
}

module.exports = BirthSearchService;
