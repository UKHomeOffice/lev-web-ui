const requestOptions = require('../../../helpers/requestOptions');
const apiConfig = require('../../../config/index').api;

describe('requestOptions()', () => {
  describe('When no token or roles exists in the request headers', () => {
    it('should return an options object', () => {

      const req = { headers: {} };
      const expected = {
        headers: {
          'x-auth-aud': apiConfig.client,
          'x-auth-username': apiConfig.username
        },
        https: {
          rejectUnauthorized: apiConfig.rejectUnauthorized
        }
      };

      const received = requestOptions(req, apiConfig);

      expect(received).toEqual(expected);
    });
  });

  describe('When token exists in the request headers', () => {
    it('should return an options object', () => {

      const req = { headers: {
        'x-auth-token': 'xxxxx'
      } };
      const expected = {
        headers: {
          'x-auth-aud': apiConfig.client,
          'x-auth-username': apiConfig.username,
          Authorization: 'Bearer xxxxx'
        },
        https: {
          rejectUnauthorized: apiConfig.rejectUnauthorized
        }
      };

      const received = requestOptions(req, apiConfig);

      expect(received).toEqual(expected);
    });
  });
  describe('When roles exists in the request headers', () => {
    it('should return an options object', () => {

      const req = { headers: {
        'x-auth-roles': 'full-details'
      } };
      const expected = {
        headers: {
          'x-auth-aud': apiConfig.client,
          'x-auth-username': apiConfig.username,
          'x-auth-roles': 'full-details'
        },
        https: {
          rejectUnauthorized: apiConfig.rejectUnauthorized
        }
      };

      const received = requestOptions(req, apiConfig);

      expect(received).toEqual(expected);
    });
  });
  describe('When both token and roles exists in the request headers', () => {
    it('should return an options object', () => {

      const req = { headers: {
        'x-auth-token': 'xxxxx',
        'x-auth-roles': 'full-details'
      } };
      const expected = {
        headers: {
          'x-auth-aud': apiConfig.client,
          'x-auth-username': apiConfig.username,
          Authorization: 'Bearer xxxxx'
        },
        https: {
          rejectUnauthorized: apiConfig.rejectUnauthorized
        }
      };

      const received = requestOptions(req, apiConfig);

      expect(received).toEqual(expected);
    });
  });
});