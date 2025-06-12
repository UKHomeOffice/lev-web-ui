const redisClient = require('./redisClient');

const get = async (key) => {
  if (!redisClient || typeof redisClient.get !== 'function') {
    return null;
  }
  return redisClient.get(key);
}

const set = async (key, value, expiryInSeconds = 60) => {
  if (!redisClient || typeof redisClient.set !== 'function') {
    return null;
  }
  return redisClient.set(key, value, 'EX', expiryInSeconds);
}

const del = async (key) => {
  if (!redisClient || typeof redisClient.del !== 'function') {
    return null;
  }
  return redisClient.del(key);
}

module.exports = { get, set, del }