const { DateTime } = require('luxon');
const { syops } = require("../config");

module.exports = (syopsDate) => {

  const inputDate = DateTime.fromISO(syopsDate, { zone: 'utc' });
  const dateRenewalRequired = DateTime.utc().plus({ days: syops.renewalAfterDays });

  return inputDate < dateRenewalRequired;
};