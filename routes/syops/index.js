'use strict';

const SyopsController= require('../../controllers/SyopsController');
const wizard = require('hmpo-form-wizard');

module.exports = wizard({
  '/': {
    entryPoint: true,
    controller: SyopsController
    },
  '/accept': {
    entryPoint: true,
    skip: true,
    controller: SyopsController
    },
  }, {}, {
  name: 'syops',
  templatePath: 'pages/syops'
});
