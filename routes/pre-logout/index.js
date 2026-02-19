'use strict';

const PreLogoutController = require('../../controllers/PreLogoutController');
const wizard = require('hmpo-form-wizard');

module.exports = wizard({
  '/': {
    entryPoint: true,
    controller: PreLogoutController,
    skip: true
  },
}, {}, {});
