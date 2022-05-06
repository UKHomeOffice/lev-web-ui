'use strict';

const ApiModel = require('./ApiModel');

class BirthSearchByNameModel extends ApiModel {

  url(_url, _args) {
    return super.url('birth');
  }

  requestConfig(config, args) {
    config.searchParams = args;

    return super.requestConfig(config, args);
  }
}

module.exports = BirthSearchByNameModel;
