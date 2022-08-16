'use strict';

const promClient = require('prom-client');
const packageJson = require('../../package.json');

let register = new promClient.Registry();

// Set default labels for all metrics
register.setDefaultLabels({
  component: packageJson.name
});

const promPrefix = 'lev_web_ui';
const promMetrics = {};

const initialiseMetrics = () => {

  const dataSets = ['birth', 'death', 'marriage', 'partnership'];
  const reqTypes = ['lookup', 'search'];

  // Counters

  // All requests
  promMetrics.req = new promClient.Counter({
    registers: [register],
    name: `${promPrefix}_req`,
    help: 'Number of requests'
  });

  // Request types
  reqTypes.forEach(reqType => {
    promMetrics.req[reqType] = new promClient.Counter({
      registers: [register],
      name: `${promPrefix}_req_${reqType}`,
      help: `Number of ${reqType} requests`
    });
  });

  // Datasets
  dataSets.forEach(dataSet => {
    promMetrics.req[dataSet] = new promClient.Counter({
      registers: [register],
      name: `${promPrefix}_req_${dataSet}`,
      help: `Number of ${dataSet} requests`
    });

    // Request types per dataset
    reqTypes.forEach(reqType => {
      promMetrics.req[dataSet][reqType] = new promClient.Counter({
        registers: [register],
        name: `${promPrefix}_req_${dataSet}_${reqType}`,
        help: `Number of ${dataSet} ${reqType} requests`
      });
    });
  });

  // Histograms
  promMetrics.req.time = new promClient.Histogram({
    registers: [register],
    name: `${promPrefix}_req_time`,
    help: 'Request time'
  });

  // Default Metrics
  promClient.collectDefaultMetrics({ register });
};

initialiseMetrics();

const metricsRoute = async (req, res) => {
  res.setHeader('Content-type', register.contentType);
  res.end(await register.metrics());
};

const incrementRequestMetrics = (reqType, dataSet, groups, startTime = 0, endTime = 0) => {

  // Initialise metrics for groups
  const escape = value => value.replace(/[ -/]/g, '');

  groups.forEach(group => {
    promMetrics.req[group] = promMetrics.req[group] || new promClient.Counter({
      registers: [register],
      name: `${promPrefix}_req_group_${escape(group)}`,
      help: `Number of ${escape(group)} requests`
    });
  });

  // Increment counters
  promMetrics.req.inc();
  promMetrics.req[reqType].inc();
  promMetrics.req[dataSet].inc();
  promMetrics.req[dataSet][reqType].inc();
  groups.forEach(group => {
    promMetrics.req[group].inc();
  });

  // Observe histograms
  promMetrics.req.time.observe(endTime - startTime);
};

module.exports = {
  metricsRoute,
  incrementRequestMetrics
};
