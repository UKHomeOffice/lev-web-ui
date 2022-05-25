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

    // https
    const https = Object.assign({}, this.options.https, retConfig.https);
    if (Object.keys(https).length) retConfig.https = https;

    console.log(retConfig);

    return super.requestConfig(retConfig, args);
  }
}

module.exports = RestApiModel;
