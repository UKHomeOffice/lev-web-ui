const { formatDate, formatAlias, resolvePathValue, getNestedValue } = require('../../../helpers/FlsSchemaHelpers');

describe('FlsSchemaHelpers', () => {
  describe('formatDate function', () => {
    it('should convert a date string YYYY-MM-DD to DD/MM/YYYY', () => {
      expect(formatDate('2025-10-25')).toEqual('25/10/2025')
    });
    it('should not convert if not a date that is in format YYYY-MM-DD', () => {
      expect(formatDate('25-10-2025')).toEqual('25-10-2025')
    });
    it('should not convert a random string', () => {
      expect(formatDate('killmenow')).toEqual('killmenow')
    });
  });
  describe('formatAlias function', () => {
    it('should return null if alias is an empty object', () => {
      expect(formatAlias({})).toEqual(null)
    });
    it('should return null if alias is an empty array', () => {
      expect(formatAlias([])).toEqual(null)
    });
    it('should convert alias object into a string', () => {
      expect(formatAlias({
          "type": "also known as",
          "forenames": "Randy",
          "surname": "Rhoads"
        }
      )).toEqual("also known as Randy Rhoads")
    });
  });

  describe('resolvePathValue', () => {
    it('should return nested value for a simple path', () => {
      const record = { person: { name: 'Ozzy' } };
      const result = resolvePathValue(record, 'person.name');
      expect(result).toBe('Ozzy');
    });

    it('should return undefined for non-existent path', () => {
      const record = { person: { name: 'Jake' } };
      const result = resolvePathValue(record, 'person.age');
      expect(result).toBeUndefined();
    });

    it('should return transformed value for placeOfMarriage with parish', () => {
      const record = {
        person: {
          placeOfMarriage: {
            address: '123 Future Divorce St',
            parish: 'St Anger'
          }
        }
      };
      const result = resolvePathValue(record, 'person.placeOfMarriage');
      expect(result).toEqual({
        address: '123 Future Divorce St in the parish of St Anger'
      });
    });

    it('should return original placeOfMarriage object if parish is missing', () => {
      const record = {
        person: {
          placeOfMarriage: {
            address: '123 Future Divorce St'
          }
        }
      };
      const result = resolvePathValue(record, 'person.placeOfMarriage');
      expect(result).toEqual({ address: '123 Future Divorce St' });
    });
  });

  describe('getNestedValue', () => {
    const record = { id: "testId", person: { name: "testName" }, status: { blocked: false } };

    it('should return formatted value for single path', () => {
      expect(getNestedValue(record, 'id')).toBe('testId');
    });

    it('should return formatted value for nested path', () => {
      expect(getNestedValue(record, 'person.name')).toBe('testName');
    });

    it('should return "UNAVAILABLE" if record is blocked and path is not "id"', () => {
      const blockedRecord = { status: { blocked: true } };

      expect(getNestedValue(blockedRecord, 'birth.date')).toBe('UNAVAILABLE');
    });

    it('should allow access to "id" even if record is blocked', () => {
      const blockedRecord = { id: "testIdBlockedRecord", status: { blocked: true } };

      expect(getNestedValue(blockedRecord, 'id')).toBe('testIdBlockedRecord');
    });

    it('should format and join multiple path values', () => {

      const record = { birth: { date: '01/01/2000' }, death: { date: '31/12/2005'}, status: { blocked: false } };
      const result = getNestedValue(record, ['birth.date', 'death.date']);

      expect(result).toBe('01/01/2000 31/12/2005');
    });

    it('should append death aliases if deceased name fields are included and aliases exist', () => {

      const record = {
        deceased: {
          forenames: 'John',
          surname: 'Osbourne',
          aliases: [{ type: 'aka', forenames: 'Ozzy', surname: 'Osbourne' }]
        },
        status: { blocked: false }
      };

      const result = getNestedValue(record, ['deceased.forenames', 'deceased.surname']);

      expect(result).toBe('John Osbourne <br>aka Ozzy Osbourne');
    });

    it('should not append death aliases if alias fields are missing', () => {
      const record = {
        deceased: {
          forenames: 'Tony',
          surname: 'Iommi',
          // no aliases property
        },
        status: { blocked: false }
      };

      const result = getNestedValue(record, ['deceased.forenames', 'deceased.surname']);

      expect(result).toBe('Tony Iommi');
    });

    it('should return formatted value for single path when path is not array and no block', () => {
      const record = { some: { date: '2022-06-15' }, status: {} };
      const result = getNestedValue(record, 'some.date');

      expect(result).toBe('15/06/2022');
    });

    it('should handle empty array path gracefully', () => {
      const record = { status: { blocked: false } };
      const result = getNestedValue(record, []);

      expect(result).toBe('');
    });
    it('should handle empty string path gracefully', () => {
      const record = { status: { blocked: false } };
      const result = getNestedValue(record, '');

      expect(result).toBe(undefined);
    });
  });
});
