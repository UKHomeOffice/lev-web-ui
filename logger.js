'use strict'

const hmpoLogger = require('hmpo-logger');
const { options } = require('./config/index');

const logger = hmpoLogger.config(options);

module.exports = logger;