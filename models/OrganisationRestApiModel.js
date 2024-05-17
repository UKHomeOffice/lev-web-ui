'use strict';

const HmpoModel = require('hmpo-model');
const { iamApi } = require('../config');

class OrganisationRestApiModel extends HmpoModel {

  requestConfig(config, args) {
    const retConfig = Object.assign({}, config);

    // url
    retConfig.url = `${iamApi.baseUrl}${this.options.url}`;

    // https
    const https = Object.assign({}, this.options.https, retConfig.https);
    if (Object.keys(https).length) retConfig.https = https;

    return super.requestConfig(retConfig, args);
  }
}

module.exports = OrganisationRestApiModel;
