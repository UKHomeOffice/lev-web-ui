'use strict';

const client = require('prom-client');
const packageJson = require('../../package.json');

let register = new client.Registry();

// Set default labels for all metrics
register.setDefaultLabels({
  component: packageJson.name
});

client.collectDefaultMetrics({ register });

const metricsRoute = async (req, res) => {
  res.setHeader('Content-type', register.contentType);
  res.end(await register.metrics());
};

module.exports = metricsRoute;
