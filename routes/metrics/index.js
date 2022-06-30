'use strict';

const client = require('prom-client');

let register = new client.Registry();

client.collectDefaultMetrics({ register });

const metricsRoute = async (req, res) => {
  res.setHeader('Content-type', register.contentType);
  res.end(await register.metrics());
};

module.exports = metricsRoute;
