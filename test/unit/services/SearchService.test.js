'use strict';

require('../logger');
const RestApiModel = require('../../../models/RestApiModel');
const SearchService = require('../../../services/SearchService');

describe('SearchService tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('processRecord()', () => {
    it('should return the input', () => {

      // Arrange
      const record = {
        id: 123456789
      };

      // Act
      const received = SearchService.processRecord(record);

      // Assert
      expect(received).toEqual(record);
    });
  });

  describe('searchById()', () => {
    describe('When I search for a valid systemNumber', () => {
      it('should return a record', async () => {

        // Arrange
        const options = {
          url: '/v1/registration/birth/123456789'
        };

        const mockApi = jest
          .spyOn(RestApiModel.prototype, 'fetch')
          .mockImplementation((callback) => {
            callback(undefined, { id: 123456789 }, 1000);
          });

        // Act
        const received = await SearchService.searchById(options);

        // Assert
        expect(received).toEqual({ id: 123456789 });
        expect(mockApi).toHaveBeenCalledTimes(1);
      });
    });

    describe('When I search for an invalid systemNumber', () => {
      it('should return undefined', async () => {

        // Arrange
        const options = {
          url: '/v1/registration/birth/123456788'
        };

        const mockApi = jest
          .spyOn(RestApiModel.prototype, 'fetch')
          .mockImplementation((callback) => {
            const err = new Error('Failed');
            err.status = 404;

            callback(err, undefined, 1000);
          });

        // Act
        const received = await SearchService.searchById(options);

        // Assert
        expect(received).toBeUndefined();
        expect(mockApi).toHaveBeenCalledTimes(1);
      });
    });

    describe('When I search for a systemNumber and an error occurs', () => {
      it('should throw an error', async () => {

        // Arrange
        const options = {
          url: '/v1/registration/birth/123456788'
        };
        const err = new Error('Failed');
        err.status = 501;

        const mockApi = jest
          .spyOn(RestApiModel.prototype, 'fetch')
          .mockImplementation((callback) => {
            callback(err, undefined, 1000);
          });

        // Act & Assert
        await expect(SearchService.searchById(options)).rejects.toEqual(err);
        expect(mockApi).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('searchByName()', () => {
    describe('When I search for criteria', () => {
      it('should return an array of records', async () => {

        // Arrange
        const options = {
          url: '/v1/registration/birth',
          searchParams: { forenames: 'Tester', surname: 'Multiple', dateOfBirth: '2010-01-01' }
        };

        const mockApi = jest
          .spyOn(RestApiModel.prototype, 'fetch')
          .mockImplementation((callback) => {
            callback(undefined, [{ id: 999999901 }, { id: 999999902 }, { id: 999999903 }], 1000);
          });

        // Act
        const received = await SearchService.searchByName(options);

        // Assert
        expect(received).toEqual([{ id: 999999901 }, { id: 999999902 }, { id: 999999903 }]);
        expect(mockApi).toHaveBeenCalledTimes(1);
      });
    });

    describe('When I search for criteria and an error occurs', () => {
      it('should throw an error', async () => {

        // Arrange
        const options = {
          url: '/v1/registration/birth',
          searchParams: { forenames: 'Tester', surname: 'Multiple', dateOfBirth: '2010-01-01' }
        };
        const err = new Error('Failed');
        err.status = 501;

        const mockApi = jest
          .spyOn(RestApiModel.prototype, 'fetch')
          .mockImplementation((callback) => {
            callback(err, undefined, 1000);
          });

        // Act & Assert
        await expect(SearchService.searchByName(options)).rejects.toEqual(err);
        expect(mockApi).toHaveBeenCalledTimes(1);
      });
    });
  });
});
