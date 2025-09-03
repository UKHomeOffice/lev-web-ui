'use strict';

const wizard = require('hmpo-form-wizard');
const steps = require('./steps');
const fields = require('./fields');

module.exports = wizard(process.env.IS_EXTERNAL === 'true' ? steps : {}, fields, {
  name: 'marriage',
  templatePath: 'pages/marriage'
});
