'use strict';

const wizard = require('hmpo-form-wizard');

module.exports = wizard({
  '/': {
    entryPoint: true
    }
  }, {}, {
  name: 'accessibility-statement',
  templatePath: 'pages/accessibility-statement'
});
