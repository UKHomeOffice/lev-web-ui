'use strict'

const isUserLoggedIn = require('../../../helpers/isUserLoggedIn');

describe('isUserLoggedIn()', () => {

  it('should return true with valid kc-access in header', () => {
    const req = {
      headers: {
        cookie: 'parameterA=abc123; kc-access=abc123; parameterC=abc123'
      }
    };

    expect(isUserLoggedIn(req)).toEqual(true);
  });

  it('should return false with empty kc-access in header', () => {
    const req = {
      headers: {
        cookie: 'parameterA=abc123; kc-access=; parameterC=abc123'
      }
    };

    expect(isUserLoggedIn(req)).toEqual(false);
  });

  it('should return false with no kc-access in header', () => {
    const req = {
      headers: {
        cookie: 'parameterA=abc123; parameterB=abc123; parameterC=abc123'
      }
    };

    expect(isUserLoggedIn(req)).toEqual(false);
  });

  it('should return false with no cookie in header', () => {
    const req = {
      headers: { }
    };

    expect(isUserLoggedIn(req)).toEqual(false);
  })
});