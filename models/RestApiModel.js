'use strict';

const HmpoModel = require('hmpo-model');
const appConfig = require('../config');
const api = appConfig.api;
const baseUrl = `${api.protocol}://${api.host}:${api.port}`;

class RestApiModel extends HmpoModel {

  requestConfig(config, args) {
    const retConfig = Object.assign({}, config);

    // url
    retConfig.url = `${baseUrl}${this.options.url}`;

    // headers
    retConfig.headers = {
      ...retConfig.headers,
      'X-Auth-Aud': api.client,
      'X-Auth-Username': api.username
    };

    // searchParams
    const searchParams = Object.assign({}, this.options.searchParams, retConfig.searchParams);
    if (Object.keys(searchParams).length) retConfig.searchParams = searchParams;

    return super.requestConfig(retConfig, args);
  }
}

module.exports = RestApiModel;
