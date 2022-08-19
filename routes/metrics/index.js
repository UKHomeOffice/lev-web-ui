'use strict';

const { register } = require('../../lib/metrics').promClient;

const metricsRoute = async (req, res) => {
  res.setHeader('Content-type', register.contentType);
  res.end(await register.metrics());
};

module.exports = {
  metricsRoute
};
