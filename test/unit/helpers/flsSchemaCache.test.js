const { flsSchemaCache } = require('../../../helpers/flsSchemaCache');
const redisService = require("../../../lib/redisCacheService");
const getUserMetadata = require('../../../helpers/getUserMetadata');
const { getRequest } = require("../../../services/UserManagement/IamApiService");
const logger = require('hmpo-logger').get();
const config = require('../../../config');

jest.mock('./../../../lib/redisCacheService');
jest.mock('../../../helpers/getUserMetadata');
jest.mock('../../../services/UserManagement/IamApiService');
jest.mock('hmpo-logger', () => {
  const mockLoggerInstance = {
    log: jest.fn()
  };
  return {
    get: jest.fn(() => mockLoggerInstance),
  };
});

const mockReq = {
  params: {},
  headers: { authorization: 'Bearer token' },
};

const mockOrgId = "mockOrgId"
const mockUserMetadata = { organisationId: mockOrgId };
const mockOrganisationInfo = {
  name: 'Test Org',
  flsSchema: { schema: 'data' },
};

describe('FlsSchemaCache', () => {
  describe('fls not enabled', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      config.fls.enabled = false;
    });
    it('should return if fls not enabled', async () => {
      config.fls.enabled = false;
      expect(await flsSchemaCache()).toBeUndefined();
    });
  });
  describe('fls enabled', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      process.env.ORGANISATION_ID = '';
      config.fls.enabled = true;
    });

    it('if exists, should use org id in params to fetch schema', async () => {
      getUserMetadata.mockResolvedValue({ organisationId: "testID" });

      redisService.get.mockResolvedValue(JSON.stringify({ cached: true }));

      const result = await flsSchemaCache({
        params: {
          orgId: "paramsOrgID"
        },
        headers: { authorization: 'Bearer token' },
      });

      expect(redisService.get).toHaveBeenCalledWith("flsSchema:paramsOrgID");
      expect(result).toEqual({ cached: true });
    });

    it('should use org id in env var if not in params to fetch schema', async () => {
      getUserMetadata.mockResolvedValue(mockUserMetadata);
      process.env.ORGANISATION_ID = 'envVarOrgId';
      redisService.get.mockResolvedValue(JSON.stringify({ cached: true }));

      const result = await flsSchemaCache(mockReq);

      expect(redisService.get).toHaveBeenCalledWith("flsSchema:envVarOrgId");
      expect(result).toEqual({ cached: true });
    });

    it('should use metadata organisation id to fetch schema if no env var or request param', async () => {
      getUserMetadata.mockResolvedValue(mockUserMetadata);
      redisService.get.mockResolvedValue(JSON.stringify({ cached: true }));

      const result = await flsSchemaCache(mockReq);

      expect(redisService.get).toHaveBeenCalledWith(`flsSchema:${mockOrgId}`);
      expect(result).toEqual({ cached: true });
    });

    it('should fetch and cache schema if not in Redis', async () => {
      getUserMetadata.mockResolvedValue(mockUserMetadata);
      redisService.get.mockResolvedValue(null);
      getRequest.mockResolvedValue(mockOrganisationInfo);

      const result = await flsSchemaCache(mockReq);

      expect(getRequest).toHaveBeenCalledWith(expect.objectContaining({
        url: `/admin/organisations/${mockOrgId}`,
      }));

      expect(redisService.set).toHaveBeenCalledWith(
        `flsSchema:${mockOrgId}`,
        JSON.stringify({
          flsSchema: mockOrganisationInfo.flsSchema,
          orgInfo: { name: mockOrganisationInfo.name, id: mockOrgId },
        }),
        config.fls.schemaCacheSeconds
      );

      expect(result).toEqual({
        flsSchema: mockOrganisationInfo.flsSchema,
        orgInfo: { name: mockOrganisationInfo.name, id: mockOrgId },
      });
    });
    it('should log error on failure', async () => {
      console.log(config.fls.enabled)
      getUserMetadata.mockRejectedValue(new Error('fail'));
      console.log('logger.log calls:', logger.log.mock.calls);
      await flsSchemaCache(mockReq);
      expect(logger.log).toHaveBeenCalledWith('error', expect.any(Error));
    });
  });
});