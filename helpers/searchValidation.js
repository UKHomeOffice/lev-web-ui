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

module.exports = {
  getDaysInMonth,
  dateOutOfBounds
}