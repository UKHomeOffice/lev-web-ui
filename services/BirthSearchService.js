'use strict';

const logger = require('hmpo-app').logger.get('birth-search-service');
const config = require('../config/default.json');
const LevModel = require('../models/LevModel');

class BirthSearchService {

  static searchById(args, callback) {
    const model = new LevModel(args, {
      url: `${config.services.restApi}/v1/registration/birth/${args.systemNumber}`,
      headers: {
        'X-Auth-Aud': 'xxxx',
        'X-Auth-Username': 'xxxx'
      }
    });

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
    const model = new LevModel(args, {
      url: `${config.services.restApi}/v1/registration/birth`,
      headers: {
        'X-Auth-Aud': 'xxxx',
        'X-Auth-Username': 'xxxx'
      },
      searchParams: args
    });

    model.fetch(args, (err, data, _responseTime) => {
      if (err) return logger.error(err);

      logger.info(data);
      callback(data);
    });
  }
}

module.exports = BirthSearchService;
