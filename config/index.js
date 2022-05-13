'use strict';

const packageJson = require('../package.json');

module.exports = {
  api: {
    protocol: process.env.API_PROTOCOL || 'http',
    host: process.env.API_HOST || 'localhost',
    port: process.env.API_PORT || 8080,
    client: packageJson.name,
    username: process.env.USER || packageJson.name,
    rejectUnauthorized: process.env.LEV_TLS_VERIFY || false
  }
};
