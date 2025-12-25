const { recordSummaryFilter } = require('../../../helpers/recordSummaryFilter');
const config = require('../../../config');

jest.mock('../../../config', () => ({
  fls: { enabled: true }
}));

describe('recordSummaryFilter', () => {
  const baseRecord = {
    id: 123,
    child: {
      surname: 'Jones',
      forenames: 'David'
    },
    mother: {
      forenames: 'Belinda',
      surname: 'Nicks'
    },
    father: {
      forenames: 'Mick',
      surname: 'Richards'
    }
  };

  const baseSchema = [
    { field: 'child.surname', ui: true },
    { field: 'child.forenames', ui: true },
    { field: 'mother.forenames', ui: true },
    { field: 'mother.surname', ui: false }
  ];

  it('returns full record if fls is disabled', () => {
    config.fls.enabled = false;
    const result = recordSummaryFilter(baseSchema, baseRecord);
    expect(result).toEqual(baseRecord);
  });

  it('filters record based on ui: true fields and includes flsIgnoreFields', () => {
    config.fls.enabled = true;
    config.fls.ignoreFieldPermissions = ['id']
    const result = recordSummaryFilter(baseSchema, baseRecord);
    expect(result).toEqual({
      id: 123,
      child: {
        surname: 'Jones',
        forenames: 'David'
      },
      mother: {
        forenames: 'Belinda'
      }
    });
  });

  it('excludes fields where ui is false', () => {
    config.fls.enabled = true;
    const result = recordSummaryFilter(baseSchema, baseRecord);
    expect(result.mother.surname).toBeUndefined();
  });

  it('returns only flsIgnoreFields when schema is empty', () => {
    config.fls.enabled = true;
    config.fls.ignoreFieldPermissions = ['id']
    const result = recordSummaryFilter([], baseRecord);
    expect(result).toEqual({ id: 123 });
  });

  it('handles deeply nested fields correctly', () => {
    const deepSchema = [
      { field: 'child.details.name.first', ui: true },
      { field: 'child.details.name.last', ui: true }
    ];

    const deepRecord = {
      id: 789,
      child: {
        details: {
          name: {
            first: 'Brian',
            last: 'Taylor'
          }
        }
      }
    };

    const result = recordSummaryFilter(deepSchema, deepRecord);
    expect(result).toEqual({
      id: 789,
      child: {
        details: {
          name: {
            first: 'Brian',
            last: 'Taylor'
          }
        }
      }
    });
  });

  it('ignores nonexistent fields gracefully', () => {
    const badSchema = [
      { field: 'nonexistent.path', ui: true },
      { field: 'child.surname', ui: true }
    ];

    const result = recordSummaryFilter(badSchema, baseRecord);
    expect(result).toEqual({
      id: 123,
      child: {
        surname: 'Jones'
      }
    });
  });

  it('includes only fields with ui: true in mixed schema', () => {
    const mixedSchema = [
      { field: 'child.surname', ui: true },
      { field: 'child.forenames', ui: false },
      { field: 'mother.forenames', ui: true }
    ];

    const result = recordSummaryFilter(mixedSchema, baseRecord);
    expect(result).toEqual({
      id: 123,
      child: {
        surname: 'Jones'
      },
      mother: {
        forenames: 'Belinda'
      }
    });
  });

  it('handles missing nested values', () => {
    const incompleteRecord = {
      id: 456,
      child: {
        forenames: 'Freddie'
      }
    };

    const result = recordSummaryFilter(baseSchema, incompleteRecord);
    expect(result).toEqual({
      id: 456,
      child: {
        forenames: 'Freddie'
      }
    });
  });
});