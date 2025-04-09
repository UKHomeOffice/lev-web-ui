const getCurrentUser = require('../../../helpers/getCurrentUser');

describe('getCurrentUser()', () => {

  beforeEach(() => {
    process.env.IAM_USER = '';
  });

  it('should return a user with x-original-username in header', () => {
    const req = {
      header: (key) => {
        const headers = {
          'x-original-username': 'malcolm.tucker@dosac.gov.uk'
        };
        return headers[key];
      }
    };

    expect(getCurrentUser(req)).toEqual("malcolm.tucker@dosac.gov.uk");
  });

  it('should return a user with x-auth-username in header', () => {
    const req = {
      header: (key) => {
        const headers = {
          'x-auth-username': 'ollie.reeder@dosac.gov.uk'
        };
        return headers[key];
      }
    };

    expect(getCurrentUser(req)).toEqual('ollie.reeder@dosac.gov.uk');
  });

  it('should return a user with set as an env variable', () => {
    process.env.IAM_USER = 'glen.cullen@dosac.gov.uk';

    expect(getCurrentUser()).toEqual('glen.cullen@dosac.gov.uk');
  });

  it('should return an empty string when not set', () => {
    expect(getCurrentUser()).toEqual('');
  });
});