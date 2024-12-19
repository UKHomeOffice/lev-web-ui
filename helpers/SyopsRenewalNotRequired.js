const { DateTime } = require('luxon');
const { syops } = require("../config");

module.exports = (syopsDate) => {

  const dateSyopsSigned = DateTime.fromISO(syopsDate, { zone: 'utc' });
  const dateRenewalRequired = DateTime.fromFormat(syops.renewalDate, 'dd/MM/yyyy', { zone: 'utc' });

  return dateSyopsSigned > dateRenewalRequired;
};