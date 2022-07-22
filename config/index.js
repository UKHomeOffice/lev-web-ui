'use strict';

const packageJson = require('../package.json');

module.exports = {
  options: {
    port: process.env.PORT || 8001,
    logs: {
      console: true,
      app: false,
      error: false
    },
    redis: {
      connectionString: process.env.REDIS_CONNECTION_STRING || undefined,
      host: process.env.REDIS_HOST || undefined,
      port: process.env.REDIS_PORT || undefined
    },
    session: {
      ttl: 600
    }
  },
  api: {
    protocol: process.env.API_PROTOCOL || 'http',
    host: process.env.API_HOST || 'localhost',
    port: process.env.API_PORT || 8080,
    client: packageJson.name,
    username: process.env.USER || packageJson.name,
    rejectUnauthorized: process.env.LEV_TLS_VERIFY !== 'false'
  }
};
