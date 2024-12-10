const SyopsRenewalRequired = require('../../../helpers/SyopsRenewalNotRequired');
const { DateTime } = require('luxon');
const { syops } = require('../../../config/index');

describe('SyopsRenewalRequired', () => {
  it('when renewal set for a day in the future, current date returns true', () => {
    syops.renewalDate = DateTime.now().plus({ days: 1 }).toFormat('dd/MM/yyyy');
    expect(SyopsRenewalRequired(DateTime.now())).toBe(false);
  });
  it('when renewal set for yesterday now returns false', () => {
    syops.renewalDate = DateTime.now().minus({ days: 1 }).toFormat('dd/MM/yyyy');
    expect(SyopsRenewalRequired(DateTime.now())).toBe(true);
  });
  it('when renewal set for a year in the future, current date returns true', () => {
    syops.renewalDate = DateTime.now().plus({ days: 365 }).toFormat('dd/MM/yyyy');
    expect(SyopsRenewalRequired(DateTime.now())).toBe(false);
  });
  it('when renewal set 2 years in the future, a syops acceptance date of 18 months in the future returns true', () => {
    syops.renewalDate = DateTime.now().plus({ days: 730 }).toFormat('dd/MM/yyyy');
    const futureDate = DateTime.now().plus({ months: 18 });

    expect(SyopsRenewalRequired(futureDate)).toBe(false);
  });
  it('when renewal set for 2 years in the future, a date 30 months in the future returns false', () => {
    syops.renewalDate = DateTime.now().plus({ days: 730 }).toFormat('dd/MM/yyyy');
    const futureDate = DateTime.now().plus({ months: 30 });

    expect(SyopsRenewalRequired(futureDate)).toBe(true);
  });
});
