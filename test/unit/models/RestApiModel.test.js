'use strict';

require('../logger');
const { api } = require('../../../config');
const RestApiModel = require('../../../models/RestApiModel');

const baseUrl = `${api.protocol}://${api.host}:${api.port}`;

describe('RestApiModel tests', () => {

  // Arrange
  const options = {
    url: '/v1/registration/birth',
    searchParams: {
      forenames: 'Tester',
      surname: 'Multiple',
      dateOfBirth: '2010-01-01'
    },
    https: {
      rejectUnauthorized: api.rejectUnauthorized
    }
  };
  const model = new RestApiModel({}, options);

  describe('requestConfig()', () => {
    it('should return a url', () => {

      // Arrange
      const expected = {
        url: `${baseUrl}${options.url}`
      };

      // Act
      const received = model.requestConfig({ method: 'GET' }, undefined);

      // Assert
      expect(received.url).toEqual(expected.url);
    });

    it('should return an https object', () => {

      // Arrange
      const expected = {
        https: {
          rejectUnauthorized: api.rejectUnauthorized
        }
      };

      // Act
      const received = model.requestConfig({ method: 'GET' }, undefined);

      // Assert
      expect(received.https.rejectUnauthorized).toEqual(expected.https.rejectUnauthorized);
    });

    it('should return a searchParams object', () => {

      // Arrange
      const expected = {
        searchParams: options.searchParams
      };

      // Act
      const received = model.requestConfig({ method: 'GET' }, undefined);

      // Assert
      expect(received.searchParams).toEqual(expected.searchParams);
    });
  });
});
