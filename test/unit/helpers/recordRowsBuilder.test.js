const mockFlsHelpers = {
  isFieldPermitted: jest.fn(),
  getNestedValue: jest.fn()
};

jest.mock('../../../helpers/FlsSchemaHelpers', () => mockFlsHelpers);

describe('recordRowsBuilder', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe('flsEnabled = true', () => {
    let recordRowsBuilder;

    beforeEach(() => {
      jest.resetModules();

      jest.doMock('../../../config', () => ({
        fls: { enabled: true }
      }));

      jest.isolateModules(() => {
        recordRowsBuilder = require('../../../helpers/recordRowsBuilder').recordRowsBuilder;
      });
    });

    it('returns empty array if permissions missing and FLS is enabled', () => {
      const result = recordRowsBuilder({}, null, {});
      expect(result).toEqual([]);
    });

    it('skips mapper entries without fields', () => {
      const mapper = { section1: { header: 'Header 1' } };
      const result = recordRowsBuilder(mapper, ['field1'], {});
      expect(result).toEqual([]);
    });

    it('filters out unpermitted fields', () => {
      mockFlsHelpers.isFieldPermitted.mockImplementation((path) => path === 'allowed.path');
      mockFlsHelpers.getNestedValue.mockReturnValue('Some value');

      const mapper = {
        section1: {
          header: 'Header 1',
          fields: [
            { path: 'allowed.path', label: 'Allowed' },
            { path: 'denied.path', label: 'Denied' }
          ]
        }
      };

      const result = recordRowsBuilder(mapper, ['allowed.path'], {});
      expect(result).toEqual([
        [{ html: '<h2>Header 1</h2>', colspan: 2, classes: 'section-head' }],
        [{ text: 'Allowed' }, { html: 'Some value' }]
      ]);
    });

    it('does not include header if no permitted fields', () => {
      mockFlsHelpers.isFieldPermitted.mockReturnValue(false);

      const mapper = {
        section1: {
          header: 'Header 1',
          fields: [{ path: 'unpermitted.path', label: 'Hidden' }]
        }
      };

      const result = recordRowsBuilder(mapper, ['unrelated.path'], {});
      expect(result).toEqual([]);
    });

    it('pulls values using getNestedValue for permitted fields', () => {
      mockFlsHelpers.isFieldPermitted.mockReturnValue(true);
      mockFlsHelpers.getNestedValue.mockReturnValue('Value');

      const mapper = {
        section1: {
          fields: [{ path: 'some.path', label: 'Field Label' }]
        }
      };

      const record = { some: { path: 'Value' } };
      const result = recordRowsBuilder(mapper, ['some.path'], record);

      expect(mockFlsHelpers.getNestedValue).toHaveBeenCalledWith(record, 'some.path');
      expect(result).toEqual([
        [{ text: 'Field Label' }, { html: 'Value' }]
      ]);
    });

    it('returns empty array for empty mapper', () => {
      const result = recordRowsBuilder({}, ['field1'], {});
      expect(result).toEqual([]);
    });

    it('handles multiple sections with mixed permitted and unpermitted fields', () => {
      mockFlsHelpers.isFieldPermitted.mockImplementation(path => path === 'a' || path === 'c');
      mockFlsHelpers.getNestedValue.mockImplementation((record, path) => record[path]);

      const mapper = {
        one: {
          header: 'Section One',
          fields: [{ path: 'a', label: 'Label A' }]
        },
        two: {
          fields: [
            { path: 'b', label: 'Label B' },
            { path: 'c', label: 'Label C' }
          ]
        }
      };

      const record = { a: 'Value A', b: 'Value B', c: 'Value C' };

      const result = recordRowsBuilder(mapper, ['a', 'c'], record);
      expect(result).toEqual([
        [{ html: '<h2>Section One</h2>', colspan: 2, classes: 'section-head' }],
        [{ text: 'Label A' }, { html: 'Value A' }],
        [{ text: 'Label C' }, { html: 'Value C' }]
      ]);
    });

    it('renders field even if value is undefined', () => {
      mockFlsHelpers.isFieldPermitted.mockReturnValue(true);
      mockFlsHelpers.getNestedValue.mockReturnValue(undefined);

      const mapper = {
        section: {
          fields: [{ path: 'missing.path', label: 'Missing Value' }]
        }
      };

      const result = recordRowsBuilder(mapper, ['missing.path'], {});
      expect(result).toEqual([
        [{ text: 'Missing Value' }, { html: undefined }]
      ]);
    });

    it('returns no fields when permissions are not an array', () => {
      mockFlsHelpers.isFieldPermitted.mockReturnValue(false);

      const mapper = {
        section: {
          fields: [{ path: 'weird.path', label: 'Odd' }]
        }
      };

      const result = recordRowsBuilder(mapper, { key: 'value' }, {});
      expect(result).toEqual([]);
    });

    it('renders falsy values correctly', () => {
      mockFlsHelpers.isFieldPermitted.mockReturnValue(true);
      mockFlsHelpers.getNestedValue.mockImplementation((record, path) => record[path]);

      const mapper = {
        section: {
          fields: [
            { path: 'zero', label: 'Zero' },
            { path: 'emptyStr', label: 'Empty' },
            { path: 'falseVal', label: 'False' }
          ]
        }
      };

      const record = { zero: 0, emptyStr: '', falseVal: false };

      const result = recordRowsBuilder(mapper, ['zero', 'emptyStr', 'falseVal'], record);

      expect(result).toEqual([
        [{ text: 'Zero' }, { html: 0 }],
        [{ text: 'Empty' }, { html: '' }],
        [{ text: 'False' }, { html: false }]
      ]);
    });
  });

  describe('flsEnabled = false', () => {
    let recordRowsBuilder;

    beforeEach(() => {
      jest.resetModules();

      jest.doMock('../../../config', () => ({
        fls: { enabled: false }
      }));

      jest.isolateModules(() => {
        recordRowsBuilder = require('../../../helpers/recordRowsBuilder').recordRowsBuilder;
      });
    });

    it('renders all fields when FLS is disabled regardless of permissions', () => {
      mockFlsHelpers.isFieldPermitted.mockReturnValue(true);
      mockFlsHelpers.getNestedValue.mockImplementation((record, path) => record[path]);

      const mapper = {
        section: {
          header: 'Test Section',
          fields: [
            { path: 'alpha', label: 'Alpha Label' },
            { path: 'beta', label: 'Beta Label' },
            { path: 'charlie', label: 'Charlie Label' }
          ]
        }
      };

      const record = { alpha: 'A', beta: 'B', charlie: 'C' };

      const result = recordRowsBuilder(mapper, null, record);

      expect(result).toEqual([
        [{ html: '<h2>Test Section</h2>', colspan: 2, classes: 'section-head' }],
        [{ text: 'Alpha Label' }, { html: 'A' }],
        [{ text: 'Beta Label' }, { html: 'B' }],
        [{ text: 'Charlie Label' }, { html: 'C' }],
      ]);
    });
  });
});
