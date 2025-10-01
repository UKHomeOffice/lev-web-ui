function getDaysInMonth(month, year) {
  if (month === 2) {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
  }

  const thirtyDayMonths = [4, 6, 9, 11];
  return thirtyDayMonths.includes(month) ? 30 : 31;
}

function dateOutOfBounds(date, maxDate) {
  return date < 1 || date > maxDate;
}

async function fieldValidation(req, res, errors, Error, dateField) {
  const dayInput = req.form.values[`${dateField}-day`];
  const monthInput = req.form.values[`${dateField}-month`];
  const yearInput = req.form.values[`${dateField}-year`];

  errors = errors || {};

  if (isNaN(dayInput)) {
    errors[dateField] = new Error(`${dateField}-day`, {
      key: dateField,
      errorGroup: dateField,
      field: `${dateField}-day`,
      type: 'numeric-day'
    }, req, res);
  } else if (isNaN(monthInput)) {
    errors[dateField] = new Error(`${dateField}-month`, {
      key: dateField,
      errorGroup: dateField,
      field: `${dateField}-month`,
      type: 'numeric-month'
    }, req, res);
  } else if (isNaN(yearInput)) {
    errors[dateField] = new Error(`${dateField}-year`, {
      key: dateField,
      errorGroup: dateField,
      field: `${dateField}-year`,
      type: 'numeric-year'
    }, req, res);
  } else {
    const day = parseInt(dayInput);
    const month = parseInt(monthInput);
    const year = parseInt(yearInput);
    const maxDay = getDaysInMonth(month, year);

    if (month > 12 || month < 1){
      errors[dateField] = new Error(dateField, {
        key: dateField,
        type: 'date-month',
      }, req, res);
    } else if (dateOutOfBounds(day, maxDay)) {
      errors[dateField] = new Error(dateField, {
        key: dateField,
        type: 'date-day',
        message: `Date must be between 1 and ${maxDay}`
      }, req, res);
    }
  }
  return errors;
}


module.exports = {
  fieldValidation
}