const syopsDateCheck = require('../../../helpers/syopsDateCheck');
const { DateTime } = require('luxon');
const { syops } = require('../../../config/index');

describe('syopsDateCheck', () => {
  it('when renewal set for a day in the future, current date returns true', () => {
    syops.renewalAfterDays = 1;
    expect(syopsDateCheck(DateTime.now())).toBe(true);
  });
  it('when renewal set for yesterday now returns false', () => {
    syops.renewalAfterDays = -1;
    expect(syopsDateCheck(DateTime.now())).toBe(false);
  });
  it('when renewal set for a year in the future, current date returns true', () => {
    syops.renewalAfterDays = 365;
    expect(syopsDateCheck(DateTime.now())).toBe(true);
  });
  it('when renewal set for 2 years in the future, a syops acceptance date of 18 months in the future returns true', () => {
    syops.renewalAfterDays = 1000
    const now = DateTime.now();
    const futureDate = now.plus({ months: 18 });

    expect(syopsDateCheck(futureDate)).toBe(true);
  });
  it('when renewal set for 2 years in the future, a date 30 months in the future returns false', () => {
    syops.renewalAfterDays = 730;
    const now = DateTime.now();
    const futureDate = now.plus({ months: 30 });

    expect(syopsDateCheck(futureDate)).toBe(false);
  });
});
