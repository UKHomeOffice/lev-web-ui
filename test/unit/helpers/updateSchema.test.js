const { expandAndCombineSchemas } = require('../../../helpers/updateSchema');

describe('expandAndCombineSchemas', () => {
  it('should handle single keys without commas', () => {
    const ui = { id: 'true' };
    const api = { id: 'false' };

    const result = expandAndCombineSchemas(ui, api);
    expect(result).toEqual([
      { field: 'id', ui: true, api: false }
    ]);
  });

  it('should handle comma-separated keys in ui', () => {
    const ui = { 'firstName, lastName': 'true' };
    const api = {};

    const result = expandAndCombineSchemas(ui, api);
    expect(result).toEqual([
      { field: 'firstName', ui: true, api: null },
      { field: 'lastName', ui: true, api: null }
    ]);
  });

  it('should handle comma-separated keys in api', () => {
    const ui = {};
    const api = { 'firstName, lastName': 'true' };

    const result = expandAndCombineSchemas(ui, api);
    expect(result).toEqual([
      { field: 'firstName', ui: null, api: true },
      { field: 'lastName', ui: null, api: true }
    ]);
  });

  it('should merge fields from both ui and api correctly', () => {
    const ui = { 'firstName,lastName': 'true', sex: 'false' };
    const api = { 'firstName': 'true', address: 'false' };

    const result = expandAndCombineSchemas(ui, api);
    expect(result).toEqual([
      { field: 'firstName', ui: true, api: true },
      { field: 'lastName', ui: true, api: null },
      { field: 'sex', ui: false, api: null },
      { field: 'address', ui: null, api: false }
    ]);
  });

  it('should handle booleans and invalid values gracefully', () => {
    const ui = { 'id': 'true', 'address': 'false', 'execute': 'absolutely' };
    const api = { 'id': 'false', 'execute': 'true' };

    const result = expandAndCombineSchemas(ui, api);
    expect(result).toEqual([
      { field: 'id', ui: true, api: false },
      { field: 'address', ui: false, api: null },
      { field: 'execute', ui: false, api: true }
    ]);
  });

  it('should handle empty inputs', () => {
    const result = expandAndCombineSchemas({}, {});
    expect(result).toEqual([]);
  });
});

