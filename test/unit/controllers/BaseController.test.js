'use strict';

const BaseController = require('../../../controllers/BaseController');
const { api } = require('../../../config');

describe('BaseController tests', () => {
  const controller = new BaseController({ route: '/index' });

  describe('getOptions()', () => {
    describe('When no token or roles exists in the request headers', () => {
      it('should return an options object', () => {

        // Arrange
        const req = { headers: {} };
        const expected = {
          headers: {
            'x-auth-aud': api.client,
            'x-auth-username': api.username
          },
          https: {
            rejectUnauthorized: api.rejectUnauthorized
          }
        };

        // Act
        const received = controller.getOptions(req);

        // Assert
        expect(received).toEqual(expected);
      });
    });

    describe('When token exists in the request headers', () => {
      it('should return an options object', () => {

        // Arrange
        const req = { headers: {
          'x-auth-token': 'xxxxx'
        } };
        const expected = {
          headers: {
            'x-auth-aud': api.client,
            'x-auth-username': api.username,
            Authorization: 'Bearer xxxxx'
          },
          https: {
            rejectUnauthorized: api.rejectUnauthorized
          }
        };

        // Act
        const received = controller.getOptions(req);

        // Assert
        expect(received).toEqual(expected);
      });
    });
    describe('When roles exists in the request headers', () => {
      it('should return an options object', () => {

        // Arrange
        const req = { headers: {
          'x-auth-roles': 'full-details'
        } };
        const expected = {
          headers: {
            'x-auth-aud': api.client,
            'x-auth-username': api.username,
            'x-auth-roles': 'full-details'
          },
          https: {
            rejectUnauthorized: api.rejectUnauthorized
          }
        };

        // Act
        const received = controller.getOptions(req);

        // Assert
        expect(received).toEqual(expected);
      });
    });
    describe('When both token and roles exists in the request headers', () => {
      it('should return an options object', () => {

        // Arrange
        const req = { headers: {
          'x-auth-token': 'xxxxx',
          'x-auth-roles': 'full-details'
        } };
        const expected = {
          headers: {
            'x-auth-aud': api.client,
            'x-auth-username': api.username,
            Authorization: 'Bearer xxxxx'
          },
          https: {
            rejectUnauthorized: api.rejectUnauthorized
          }
        };

        // Act
        const received = controller.getOptions(req);

        // Assert
        expect(received).toEqual(expected);
      });
    });
  });

  describe('pageNotFound()', () => {
    it('should return an error object', () => {

      // Arrange
      const expected = new Error('Page not found');
      expected.code = 'PAGE_NOT_FOUND';
      expected.status = 404;
      expected.template = 'errors/page-not-found';

      // Act
      const received = controller.pageNotFound();

      // Assert
      expect(received).toEqual(expected);
    });
  });

  describe('hasRole()', () => {
    it('should return false when the given role is not present in the request headers', () => {

      // Arrange
      const req = { headers: { 'x-auth-roles': [] } };
      const role = 'full-details';

      // Act
      const received = controller.hasRole(req, role);

      // Assert
      expect(received).toEqual(false);
    });

    it('should return true when the given role is present in the request headers', () => {

      // Arrange
      const req = { headers: { 'x-auth-roles': ['full-details'] } };
      const role = 'full-details';

      // Act
      const received = controller.hasRole(req, role);

      // Assert
      expect(received).toEqual(true);
    });
  });
});
