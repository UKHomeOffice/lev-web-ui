'use strict';

const ApiModel = require('./ApiModel');

class BirthSearchByIdModel extends ApiModel {

  url(_url, args) {
    return super.url(`birth/${args.systemNumber}`);
  }
}

module.exports = BirthSearchByIdModel;
