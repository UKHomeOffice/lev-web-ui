'use strict';

const wizard = require('hmpo-form-wizard');
const steps = require('./steps');

module.exports = wizard(steps, null, {
  name: 'organisation',
  templatePath: 'pages/organisation'
});
