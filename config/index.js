'use strict';

const packageJson = require('../package.json');

const conf = {
  api: {
    protocol: process.env.API_PROTOCOL || 'http',
    host: process.env.API_HOST || 'localhost',
    port: process.env.API_PORT || 8080,
    client: packageJson.name,
    username: process.env.USER || packageJson.name
  },
  logs: {
    console: true,
    app: false,
    error: false
  },
  port: process.env.PORT || 8001
};


module.exports = conf;
