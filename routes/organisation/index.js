'use strict';

const wizard = require('hmpo-form-wizard');
const { externalRoutes, internalRoutes } = require('./steps');
const fields = require('./fields');

// internal has to be first for route matching otherwise matches team lookup rather than adding team
const steps = process.env.IS_EXTERNAL === 'true' ? externalRoutes : {...internalRoutes, ...externalRoutes};

module.exports = wizard(steps, fields, {
  name: 'organisation',
  templatePath: 'pages/organisation'
});
