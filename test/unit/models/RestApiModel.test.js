'use strict';

const { config, logger } = require('hmpo-app');
const { api, options } = require('../../../config');
const RestApiModel = require('../../../models/RestApiModel');

config.setup(options.config);
logger.setup(options.logs);

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
      expect(received.url).toBe(expected.url);
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
      expect(received.https.rejectUnauthorized).toBe(expected.https.rejectUnauthorized);
    });

    it('should return a searchParams object', () => {

      // Arrange
      const expected = {
        searchParams: options.searchParams
      };

      // Act
      const received = model.requestConfig({ method: 'GET' }, undefined);

      // Assert
      expect(received.searchParams.surname).toBe(expected.searchParams.surname);
      expect(received.searchParams.forenames).toBe(expected.searchParams.forenames);
      expect(received.searchParams.dateOfBirth).toBe(expected.searchParams.dateOfBirth);
    });
  });
});
