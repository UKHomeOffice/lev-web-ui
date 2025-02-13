'use strict';

const wizard = require('hmpo-form-wizard');
const HomeController = require('../../controllers/HomeController');

module.exports = wizard({
  '/': {
    entryPoint: true,
    controller: HomeController
  },
}, {}, {
  name: 'home',
  templatePath: 'pages/home'
});