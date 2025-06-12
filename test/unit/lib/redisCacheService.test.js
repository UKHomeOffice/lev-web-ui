jest.mock('./../../../lib/redisClient', () => ({
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
}));

const redisClient = require('./../../../lib/redisClient');
const redisCacheService = require('./../../../lib/redisCacheService');

describe('redisCacheService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('get should return value from redisClient.get', async () => {
    redisClient.get.mockResolvedValue('redisClient');

    const result = await redisCacheService.get('testKey');
    expect(redisClient.get).toHaveBeenCalledWith('testKey');
    expect(result).toBe('redisClient');
  });

  test('set should call redisClient.set with expiry', async () => {
    redisClient.set.mockResolvedValue('OK');

    const result = await redisCacheService.set('myKey', 'myValue', 120);
    expect(redisClient.set).toHaveBeenCalledWith('myKey', 'myValue', 'EX', 120);
    expect(result).toBe('OK');
  });

  test('del should call redisClient.del', async () => {
    redisClient.del.mockResolvedValue(1);

    const result = await redisCacheService.del('myKey');
    expect(redisClient.del).toHaveBeenCalledWith('myKey');
    expect(result).toBe(1);
  });
});
