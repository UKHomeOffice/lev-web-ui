'use strict'

const { config, logger } = require('hmpo-app');
const { options } = require('./config/index');

config.setup(options.config);
logger.setup(options.logs);

module.exports = logger;