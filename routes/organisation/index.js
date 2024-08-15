'use strict';

const wizard = require('hmpo-form-wizard');
const steps = require('./steps');
const fields = require('./fields');

module.exports = wizard(steps, fields, {
  name: 'organisation',
  templatePath: 'pages/organisation'
});
