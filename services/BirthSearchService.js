'use strict';

const logger = require('hmpo-app').logger.get('birth-search-service');
const BirthSearchByIdModel = require('../models/BirthSearchByIdModel');
const BirthSearchByNameModel = require('../models/BirthSearchByNameModel');

class BirthSearchService {

  static searchById(args, callback) {
    const model = new BirthSearchByIdModel();
    model.fetch(args, (err, data, _responseTime) => {
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

  static searchByName(args, callback) {
    const model = new BirthSearchByNameModel();

    model.fetch(args, (err, data, _responseTime) => {
      if (err) return logger.error(err);

      logger.info(data);
      callback(data);
    });
  }
}

module.exports = BirthSearchService;
