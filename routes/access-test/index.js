'use strict';

const wizard = require('hmpo-form-wizard');

module.exports = wizard({
  '/': {
    entryPoint: true
    }
  }, {}, {
  name: 'access-test',
  templatePath: 'pages/access-test'
});
