'use strict';

const { searchById, searchByName } = require('../../api');
const config = require('../../config');

describe('Birth search tests', () => {

  const options = {
    headers: {
      'x-auth-aud': config.api.client,
      'x-auth-username': config.api.username
    }
  };

  describe('searchById', () => {
    it('123456789 should return a record', async () => {

      // Arrange
      const systemNumber = 123456789;

      // Act
      const record = await searchById({
        ...options,
        url: `/v1/registration/birth/${systemNumber}`
      });

      // Assert
      expect(record).toBeDefined();
      expect(record.id).toEqual(systemNumber);
    });

    it('123 should return undefined', async () => {

      // Arrange
      const systemNumber = 123;

      // Act
      const record = await searchById({
        ...options,
        url: `/v1/registration/birth/${systemNumber}`
      });

      // Assert
      expect(record).not.toBeDefined();
    });

    it('invalid should throw exception', async () => {

      // Arrange
      const systemNumber = 'invalid';

      // Act & Assert
      await expect(searchById({
        ...options,
        url: `/v1/registration/birth/${systemNumber}`
      })).rejects.toEqual({
        code: 'BadRequest',
        message: 'ID must be an integer',
        status: 400
      });
    });
  });

  describe('searchByName', () => {
    it('for Tester One Multiple should return single element array', async () => {

      // Arrange
      const forenames = 'Tester One';
      const surname = 'Multiple';
      const dateOfBirth = '2010-01-01';

      // Act
      const searchResults = await searchByName({
        ...options,
        url: '/v1/registration/birth',
        searchParams: { forenames, surname, dateOfBirth }
      });

      // Assert
      expect(searchResults).toHaveLength(1);
      expect(searchResults[0].child.forenames).toEqual(forenames);
      expect(searchResults[0].child.surname).toEqual(surname);
      expect(searchResults[0].child.dateOfBirth).toEqual(dateOfBirth);
    });

    it('Tester Multiple should return array of 3 elements', async () => {

      // Arrange
      const forenames = 'Tester';
      const surname = 'Multiple';
      const dateOfBirth = '2010-01-01';

      // Act
      const searchResults = await searchByName({
        ...options,
        url: '/v1/registration/birth',
        searchParams: { forenames, surname, dateOfBirth }
      });

      // Assert
      expect(searchResults).toHaveLength(3);
      expect(searchResults[0].child.forenames).toEqual('Tester One');
      expect(searchResults[0].child.surname).toEqual(surname);
      expect(searchResults[0].child.dateOfBirth).toEqual(dateOfBirth);
      expect(searchResults[1].child.forenames).toEqual('Tester Two');
      expect(searchResults[2].child.forenames).toEqual('Tester Three');
    });

    it('Tester Solo should return an empty array', async () => {

      // Arrange
      const forenames = 'Tester';
      const surname = 'Solo';
      const dateOfBirth = '2010-01-01';

      // Act
      const searchResults = await searchByName({
        ...options,
        url: '/v1/registration/birth',
        searchParams: { forenames, surname, dateOfBirth }
      });

      // Assert
      expect(searchResults).toHaveLength(0);
    });

    it('invalid should throw exception', async () => {

      // Arrange
      const forenames = '';
      const surname = 'Solo';
      const dateOfBirth = '2010-01-01';

      // Act & Assert
      await expect(searchByName({
        ...options,
        url: '/v1/registration/birth',
        searchParams: { forenames, surname, dateOfBirth }
      })).rejects.toEqual({
        code: 'BadRequest',
        message: 'Must provide the forenames parameter',
        status: 400
      });
    });
  });
});
