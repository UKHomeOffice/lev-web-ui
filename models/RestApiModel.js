'use strict';

const HmpoModel = require('hmpo-model');
const { api } = require('../config');

class RestApiModel extends HmpoModel {

  requestConfig(config, args) {
    const retConfig = Object.assign({}, config);

    // url
    retConfig.url = `${api.baseUrl}${this.options.url}`;

    // searchParams
    const searchParams = Object.assign({}, this.options.searchParams, retConfig.searchParams);
    if (Object.keys(searchParams).length) retConfig.searchParams = searchParams;

    // https
    const https = Object.assign({}, this.options.https, retConfig.https);
    if (Object.keys(https).length) retConfig.https = https;

    return super.requestConfig(retConfig, args);
  }
}

module.exports = RestApiModel;
