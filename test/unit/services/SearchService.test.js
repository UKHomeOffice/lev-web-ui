'use strict';

const SearchService = require('../../../services/SearchService');

describe('SearchService tests', () => {
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
});
