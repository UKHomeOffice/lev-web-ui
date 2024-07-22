const queryParamsBuilder = require('../../../helpers/queryParamsBuilder');

describe('queryBuilder', () => {
  it('should return an empty string if no query parameters are provided', () => {
    const req = { query: {} };
    expect(queryParamsBuilder(req)).toBe('');
  });

  it('should return a correctly formatted query string for provided parameters', () => {
    const req = { query: { page: '1', perPage: '10', sort: 'name', order: 'asc' } };
    expect(queryParamsBuilder(req)).toBe('?page=1&perPage=10&sort=name&order=asc');
  });

  it('should only include parameters that are present', () => {
    const req = { query: { page: '2', sort: 'date' } };
    expect(queryParamsBuilder(req)).toBe('?page=2&sort=date');
  });

  it('should return an empty string if no recognised parameters are provided', () => {
    const req = { query: { foo: 'bar' } };
    expect(queryParamsBuilder(req)).toBe('');
  });

  it('should handle some parameters being empty', () => {
    const req = { query: { page: '3', perPage: '', sort: 'price' } };
    expect(queryParamsBuilder(req)).toBe('?page=3&sort=price');
  });
});
