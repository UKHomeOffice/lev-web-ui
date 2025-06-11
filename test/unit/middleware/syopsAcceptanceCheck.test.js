const { syopsAcceptanceCheck } = require('../../../middleware/syopsAcceptanceCheck');
const redisService = require('../../../lib/redisCacheService');
const IamApiService = require('../../../services/UserManagement/IamApiService');
const config = require('../../../config');
const SyopsRenewalNotRequired = require('../../../helpers/SyopsRenewalNotRequired');
var mockLoggerInstance;

jest.mock('../../../lib/redisCacheService');
jest.mock('../../../services/UserManagement/IamApiService', () => ({
  getRequest: jest.fn()
}));
jest.mock('../../../config');
jest.mock('../../../helpers/SyopsRenewalNotRequired');
jest.mock('hmpo-logger', () => {
  mockLoggerInstance = {
    log: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };
  return {
    get: jest.fn(() => mockLoggerInstance),
  };
});
jest.mock('./../../../helpers/requestOptions', () => jest.fn(() => ({ headers: {} })));

describe('syopsAcceptanceCheck', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      locals: {},
      redirect: jest.fn()
    };
    next = jest.fn();

    redisService.get.mockResolvedValue(null);
    config.bypassSyops = false;
    config.syops = {
      renewalDate: '01-01-2023',
      metadataCacheSeconds: 3600
    };
    SyopsRenewalNotRequired.mockReturnValue(false);
  });

  it('should call next if config.bypassSyops is true', async () => {
    config.bypassSyops = true;

    await syopsAcceptanceCheck(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.redirect).not.toHaveBeenCalled();
  });

  it('should call next if SyopsAccepted is true in Redis', async () => {
    redisService.get.mockResolvedValue(true);

    await syopsAcceptanceCheck(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.redirect).not.toHaveBeenCalled();
  });

  it('should redirect to /syops if syopsAcceptedAt is not found', async () => {
    IamApiService.getRequest.mockResolvedValue({
      metadata: {}
    });

    await syopsAcceptanceCheck(req, res, next);

    expect(res.redirect).toHaveBeenCalledWith('/syops');
    expect(next).not.toHaveBeenCalled();
  });

  it('should redirect to /syops if SyopsRenewalNotRequired returns false', async () => {
    IamApiService.getRequest.mockResolvedValue({
      metadata: {}
    });
    SyopsRenewalNotRequired.mockReturnValue(false);

    await syopsAcceptanceCheck(req, res, next);

    expect(res.redirect).toHaveBeenCalledWith('/syops');
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if syopsAcceptedAt is valid and SyopsRenewalNotRequired returns true', async () => {
    IamApiService.getRequest.mockResolvedValue({
      user: "testUser",
      metadata: {
        syopsAcceptedAt: '01-01-2023'
      }
    });
    SyopsRenewalNotRequired.mockReturnValue(true);

    await syopsAcceptanceCheck(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(redisService.set).toHaveBeenCalledWith('testUser:SyopsAccepted', true, 3600);
    expect(res.locals.syopsAccepted).toBe(true);
  });

  it('should log an error if an exception is thrown', async () => {
    const error = new Error('Test error');
    IamApiService.getRequest.mockRejectedValue(error);

    await syopsAcceptanceCheck(req, res, next);

    expect(mockLoggerInstance.log).toHaveBeenCalledWith("error", error);
  });
});
