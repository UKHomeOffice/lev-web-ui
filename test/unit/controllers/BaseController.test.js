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
        expect(received.headers['x-auth-aud']).toBe(expected.headers['x-auth-aud']);
        expect(received.headers['x-auth-username']).toBe(expected.headers['x-auth-username']);
        expect(received.headers['x-auth-roles']).toBeUndefined();
        expect(received.headers.Authorization).toBeUndefined();
        expect(received.https.rejectUnauthorized).toBe(expected.https.rejectUnauthorized);
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
        expect(received.headers['x-auth-aud']).toBe(expected.headers['x-auth-aud']);
        expect(received.headers['x-auth-username']).toBe(expected.headers['x-auth-username']);
        expect(received.headers['x-auth-roles']).toBeUndefined();
        expect(received.headers.Authorization).toBe(expected.headers.Authorization);
        expect(received.https.rejectUnauthorized).toBe(expected.https.rejectUnauthorized);
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
        expect(received.headers['x-auth-aud']).toBe(expected.headers['x-auth-aud']);
        expect(received.headers['x-auth-username']).toBe(expected.headers['x-auth-username']);
        expect(received.headers['x-auth-roles']).toBe(expected.headers['x-auth-roles']);
        expect(received.https.Authorization).toBeUndefined();
        expect(received.https.rejectUnauthorized).toBe(expected.https.rejectUnauthorized);
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
            'x-auth-roles': 'full-details',
            Authorization: 'Bearer xxxxx'
          },
          https: {
            rejectUnauthorized: api.rejectUnauthorized
          }
        };

        // Act
        const received = controller.getOptions(req);

        // Assert
        expect(received.headers['x-auth-aud']).toBe(expected.headers['x-auth-aud']);
        expect(received.headers['x-auth-username']).toBe(expected.headers['x-auth-username']);
        expect(received.headers['x-auth-roles']).toBeUndefined();
        expect(received.headers.Authorization).toBe(expected.headers.Authorization);
        expect(received.https.rejectUnauthorized).toBe(expected.https.rejectUnauthorized);
      });
    });
  });

  describe('pageNotFound()', () => {
    it('should return an error object', () => {

      // Arrange
      const expected = {
        code: 'PAGE_NOT_FOUND',
        status: 404,
        template: 'errors/page-not-found'
      };

      // Act
      const received = controller.pageNotFound();

      // Assert
      expect(received.code).toBe(expected.code);
      expect(received.status).toBe(expected.status);
      expect(received.template).toBe(expected.template);
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
      expect(received).toBe(false);
    });

    it('should return true when the given role is present in the request headers', () => {

      // Arrange
      const req = { headers: { 'x-auth-roles': ['full-details'] } };
      const role = 'full-details';

      // Act
      const received = controller.hasRole(req, role);

      // Assert
      expect(received).toBe(true);
    });
  });
});
