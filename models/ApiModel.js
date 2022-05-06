'use strict';

const HmpoModel = require('hmpo-model');
const config = require('../config/default.json');

class ApiModel extends HmpoModel {

  url(url) {
    return super.url(`${config.services.restApi}/v1/registration/${url}`);
  }

  requestConfig(config, args) {
    config.headers = {
      'X-Auth-Aud': 'xxxx',
      'X-Auth-Username': 'xxxx'
    };

    return super.requestConfig(config, args);
  }
}

module.exports = ApiModel;
