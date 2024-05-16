'use strict';

const HmpoModel = require('hmpo-model');
const { iamApi } = require('../config');
const baseUrl = `${iamApi.protocol}://${iamApi.host}:${iamApi.port}`;

class OrganisationRestApiModel extends HmpoModel {

  requestConfig(config, args) {
    const retConfig = Object.assign({}, config);

    // url
    retConfig.url = `${baseUrl}${this.options.url}`;

    // https
    const https = Object.assign({}, this.options.https, retConfig.https);
    if (Object.keys(https).length) retConfig.https = https;

    return super.requestConfig(retConfig, args);
  }
}

module.exports = OrganisationRestApiModel;
