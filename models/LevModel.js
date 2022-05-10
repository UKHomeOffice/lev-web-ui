'use strict';

const HmpoModel = require('hmpo-model');

class LevModel extends HmpoModel {

  requestConfig(config, args) {
    const retConfig = Object.assign({}, config);

    // headers
    retConfig.headers = {
      ...retConfig.headers,
      'X-Auth-Aud': 'xxxx',
      'X-Auth-Username': 'xxxx'
    };

    // searchParams
    const searchParams = Object.assign({}, this.options.searchParams, retConfig.searchParams);
    if (Object.keys(searchParams).length) retConfig.searchParams = searchParams;

    return super.requestConfig(retConfig, args);
  }
}

module.exports = LevModel;
