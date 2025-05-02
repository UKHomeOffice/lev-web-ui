'use strict';

const BaseController = require('../../../controllers/BaseController');

describe('BaseController tests', () => {
  const controller = new BaseController({ route: '/index' });

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
      const role = 'birth';

      // Act
      const received = controller.hasRole(req, role);

      // Assert
      expect(received).toEqual(false);
    });

    it('should return true when the given role is present in the request headers', () => {

      // Arrange
      const req = { headers: { 'x-auth-roles': ['birth'] } };
      const role = 'birth';

      // Act
      const received = controller.hasRole(req, role);

      // Assert
      expect(received).toEqual(true);
    });
  });

  describe('getGroups()', () => {
    describe('When no groups exists in the request headers', () => {
      it('should return an empty array', () => {

        // Arrange
        const req = { headers: {} };

        // Act
        const received = controller.getGroups(req);

        // Assert
        expect(received).toEqual([]);
      });
    });
    describe('When groups exist in the request headers', () => {
      it('should return an array of groups', () => {

        // Arrange
        const req = { headers: {
          'x-auth-groups': 'RealmAdministrators,HMPO/LEV'
        }};

        // Act
        const received = controller.getGroups(req);

        // Assert
        expect(received).toEqual(['RealmAdministrators', 'HMPO/LEV']);
      });
    });
  });
});
