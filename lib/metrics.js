'use strict';

const { DateTime } = require('luxon');
const promClient = require('prom-client');
const register = promClient.register;
const packageJson = require('../package.json');

// Set default labels for all metrics
register.setDefaultLabels({
  component: packageJson.name
});

const promPrefix = 'lev_web_ui';
const promMetrics = {};

const initialiseMetrics = () => {

  // Default Metrics
  promClient.collectDefaultMetrics({ register });

  const dataSets = ['birth', 'death', 'marriage', 'partnership'];
  const reqTypes = ['lookup', 'search'];

  // Requests

  // Counters
  promMetrics.req = new promClient.Counter({
    name: `${promPrefix}_req`,
    help: 'Number of requests'
  });

  // Request types
  reqTypes.forEach(reqType => {
    promMetrics.req[reqType] = new promClient.Counter({
      name: `${promPrefix}_req_${reqType}`,
      help: `Number of ${reqType} requests`
    });
  });

  // Datasets
  dataSets.forEach(dataSet => {
    promMetrics.req[dataSet] = new promClient.Counter({
      name: `${promPrefix}_req_${dataSet}`,
      help: `Number of ${dataSet} requests`
    });

    // Request types per dataset
    reqTypes.forEach(reqType => {
      promMetrics.req[dataSet][reqType] = new promClient.Counter({
        name: `${promPrefix}_req_${dataSet}_${reqType}`,
        help: `Number of ${dataSet} ${reqType} requests`
      });
    });
  });

  // Histograms
  promMetrics.req.time = new promClient.Histogram({
    name: `${promPrefix}_req_time`,
    help: 'Request time of requests'
  });

  // Request types
  reqTypes.forEach(reqType => {
    promMetrics.req[reqType].time = new promClient.Histogram({
      name: `${promPrefix}_req_${reqType}_time`,
      help: `Request time of ${reqType} requests`
    });
  });

  // Datasets
  dataSets.forEach(dataSet => {
    promMetrics.req[dataSet].time = new promClient.Histogram({
      name: `${promPrefix}_req_${dataSet}_time`,
      help: `Request time of ${dataSet} requests`
    });

    // Request types per dataset
    reqTypes.forEach(reqType => {
      promMetrics.req[dataSet][reqType].time = new promClient.Histogram({
        name: `${promPrefix}_req_${dataSet}_${reqType}_time`,
        help: `Request time of ${dataSet} ${reqType} requests`
      });
    });
  });

  // Errors

  // Counters
  promMetrics.err = new promClient.Counter({
    name: `${promPrefix}_err`,
    help: 'Number of errors'
  });

  // Request types
  reqTypes.forEach(reqType => {
    promMetrics.err[reqType] = new promClient.Counter({
      name: `${promPrefix}_err_${reqType}`,
      help: `Number of ${reqType} errors`
    });
  });

  // Datasets
  dataSets.forEach(dataSet => {
    promMetrics.err[dataSet] = new promClient.Counter({
      name: `${promPrefix}_err_${dataSet}`,
      help: `Number of ${dataSet} errors`
    });

    // Request types per dataset
    reqTypes.forEach(reqType => {
      promMetrics.err[dataSet][reqType] = new promClient.Counter({
        name: `${promPrefix}_err_${dataSet}_${reqType}`,
        help: `Number of ${dataSet} ${reqType} errors`
      });
    });
  });

  // Histograms
  promMetrics.err.time = new promClient.Histogram({
    name: `${promPrefix}_err_time`,
    help: 'Request time of errors'
  });

  // Request types
  reqTypes.forEach(reqType => {
    promMetrics.err[reqType].time = new promClient.Histogram({
      name: `${promPrefix}_err_${reqType}_time`,
      help: `Request time of ${reqType} errors`
    });
  });

  // Datasets
  dataSets.forEach(dataSet => {
    promMetrics.err[dataSet].time = new promClient.Histogram({
      name: `${promPrefix}_err_${dataSet}_time`,
      help: `Request time of ${dataSet} errors`
    });

    // Request types per dataset
    reqTypes.forEach(reqType => {
      promMetrics.err[dataSet][reqType].time = new promClient.Histogram({
        name: `${promPrefix}_err_${dataSet}_${reqType}_time`,
        help: `Request time of ${dataSet} ${reqType} errors`
      });
    });
  });
};

const initialiseGroupMetrics = (groups) => {

  // Initialise metrics for groups
  const escape = value => value.replace(/[ -/]/g, '');

  groups.forEach(group => {

    // Requests
    promMetrics.req[group] = promMetrics.req[group] || new promClient.Counter({
      name: `${promPrefix}_req_group_${escape(group)}`,
      help: `Number of requests from members of the ${escape(group)} group`
    });

    promMetrics.req[group].time = promMetrics.req[group].time || new promClient.Histogram({
      name: `${promPrefix}_req_group_${escape(group)}_time`,
      help: `Request time of requests from members of the ${escape(group)} group`
    });

    // Errors
    promMetrics.err[group] = promMetrics.err[group] || new promClient.Counter({
      name: `${promPrefix}_err_group_${escape(group)}`,
      help: `Number of errors from members of the ${escape(group)} group`
    });

    promMetrics.err[group].time = promMetrics.err[group].time || new promClient.Histogram({
      name: `${promPrefix}_err_group_${escape(group)}_time`,
      help: `Request time of errors from members of the ${escape(group)} group`
    });
  });
};

const incrementMetrics = (type, reqType, dataSet, groups, duration) => {

  // Initialise group metrics
  initialiseGroupMetrics(groups);

  // Increment counters
  promMetrics[type].inc();
  promMetrics[type][reqType].inc();
  promMetrics[type][dataSet].inc();
  promMetrics[type][dataSet][reqType].inc();
  groups.forEach(group => {
    promMetrics[type][group].inc();
  });

  // Observe histograms
  duration /= 1000; // convert milliseconds to seconds

  promMetrics[type].time.observe(duration);
  promMetrics[type][reqType].time.observe(duration);
  promMetrics[type][dataSet].time.observe(duration);
  promMetrics[type][dataSet][reqType].time.observe(duration);
  groups.forEach(group => {
    promMetrics[type][group].time.observe(duration);
  });
};

const incrementRequestMetrics = (reqType, dataSet, groups, duration) => {
  incrementMetrics('req', reqType, dataSet, groups, duration);
};

const incrementErrorMetrics = (reqType, dataSet, groups, duration) => {
  incrementMetrics('err', reqType, dataSet, groups, duration);
};

initialiseMetrics();

const getCurrentTimeInMillis = () => {
  return DateTime.now().toMillis();
};

module.exports = {
  promClient,
  getCurrentTimeInMillis,
  incrementErrorMetrics,
  incrementRequestMetrics,
  initialiseMetrics,
  promMetrics
};
