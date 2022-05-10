'use strict';

const HmpoModel = require('hmpo-model');

class LevModel extends HmpoModel {

  requestConfig(config, args) {
    const retConfig = Object.assign({}, config);

    const searchParams = Object.assign({}, this.options.searchParams, retConfig.searchParams);
    if (Object.keys(searchParams).length) retConfig.searchParams = searchParams;

    return super.requestConfig(retConfig, args);
  }
}

module.exports = LevModel;
