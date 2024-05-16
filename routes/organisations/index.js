'use strict';

const wizard = require('hmpo-form-wizard');
const steps = require('./steps');

module.exports = wizard(steps, null, {
  name: 'organisations',
  templatePath: 'pages/organisations'
});
