const Redis = require("ioredis");

let client = null;
if (process.env.REDIS_CONNECTION_STRING) {
  client = new Redis(process.env.REDIS_CONNECTION_STRING);
}

module.exports = client;
