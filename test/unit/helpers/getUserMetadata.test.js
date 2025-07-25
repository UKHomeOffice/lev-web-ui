const getUserMetadata = require('../../../helpers/getUserMetadata');
const redisService = require('../../../lib/redisCacheService');
const IamApiService = require('../../../services/UserManagement/IamApiService');
const getCurrentUser = require('../../../helpers/getCurrentUser');
const requestOptions = require('../../../helpers/requestOptions');
const config = require('../../../config');

jest.mock('../../../lib/redisCacheService');
jest.mock('../../../helpers/getCurrentUser');
jest.mock('../../../services/UserManagement/IamApiService', () => ({
  getRequest: jest.fn()
}));
jest.mock('../../../config');
jest.mock('./../../../helpers/requestOptions', () => jest.fn(() => ({ headers: {} })));

describe('getUserMetadata', () => {
  const req = { headers: { authorization: 'Bearer token' } };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns metadata from Redis if cached', async () => {
    const fakeUser = 'rob.halford';
    const cachedMetadata = { user: 'rob.halford', orgId: 'orgId' };

    getCurrentUser.mockReturnValue(fakeUser);
    redisService.get.mockResolvedValue(JSON.stringify(cachedMetadata));

    const result = await getUserMetadata(req);

    expect(redisService.get).toHaveBeenCalledWith('rob.halford:UserMetadata');
    expect(result).toEqual(cachedMetadata);
    expect(IamApiService.getRequest).not.toHaveBeenCalled();
  });

  it('fetches from API and sets Redis if not cached', async () => {
    const fakeUser = 'vincent.furnier';
    const freshMetadata = { user: 'vincent.furnier', orgId: 'orgId' };
    const requestOpts = { headers: { Authorization: 'Bearer token' } };

    getCurrentUser.mockReturnValue(fakeUser);
    redisService.get.mockResolvedValue(null);
    requestOptions.mockReturnValue(requestOpts);
    IamApiService.getRequest.mockResolvedValue(freshMetadata);

    const result = await getUserMetadata(req);

    expect(redisService.get).toHaveBeenCalledWith('vincent.furnier:UserMetadata');
    expect(IamApiService.getRequest).toHaveBeenCalledWith({
      ...requestOpts,
      url: '/user/metadata'
    });
    expect(redisService.set).toHaveBeenCalledWith(
      'vincent.furnier:UserMetadata',
      JSON.stringify(freshMetadata),
      config.syops.metadataCacheSeconds
    );
    expect(result).toEqual(freshMetadata);
  });
});
