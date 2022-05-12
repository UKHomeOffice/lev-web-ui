'use strict';

const HmpoModel = require('hmpo-model');
const { api } = require('../config');
const baseUrl = `${api.protocol}://${api.host}:${api.port}`;

class RestApiModel extends HmpoModel {

  requestConfig(config, args) {
    const retConfig = Object.assign({}, config);

    // url
    retConfig.url = `${baseUrl}${this.options.url}`;

    // searchParams
    const searchParams = Object.assign({}, this.options.searchParams, retConfig.searchParams);
    if (Object.keys(searchParams).length) retConfig.searchParams = searchParams;

    return super.requestConfig(retConfig, args);
  }
}

module.exports = RestApiModel;
