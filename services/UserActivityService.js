'use strict';

const RestApiModel = require('../models/RestApiModel');
const { DateTime } = require('luxon');
class UserActivityService {

  /**
   * Calls the REST API with the given options and returns an array of search results as a Promise.
   *
   * @param options
   * @returns {Promise<[record]>}
   */
  static async searchByParams(options) {
    return await new Promise((resolve, reject) => {
      const model = new RestApiModel({}, options);
      model.fetch((err, data, _responseTime) => {
        if (err) {
          reject(err);
        } else {
          Object.keys(data).length !== 0 ? resolve(this.processRecord(data, options.searchParams, options.includeWeekends)) : resolve(data);
        }
      });
    });
  }

  /**
   * Transform/decorate the record with additional properties
   *
   * @param record
   * @param params
   * @param includeWeekends
   * @returns {{header: {data: string, isWeekend}[], rows: *[]}}
   */
  static processRecord(record, params, includeWeekends) {
    const from = DateTime.fromISO(params.from);
    const to = DateTime.fromISO(params.to);
    const diff = to.diff(from, 'days').days;

    // create array of dates between to and from user input and whether the date is a weekend
    let dateArr = Array(diff).fill(undefined).map((i, index) => {
      const day = from.plus({ days: index });
      return { data: day.toFormat('dd-MM-yyyy'), isWeekend: day.weekdayShort === 'Sat' || day.weekdayShort === 'Sun' };
    });

    // filter out weekends if required
    if (!includeWeekends) {
      dateArr = dateArr.filter((row => !row.isWeekend));
    }

    const rowBuilder = ((dates, user) => {
      const row = dateArr.reduce((acc, cur) => {

        // check if record contains searches for a given date and return array of date and count
        const dateCount = dates.find(item => {
          const convertedDate = DateTime.fromISO((item[0])).toFormat('dd-MM-yyyy');
          return convertedDate === cur.data;
        });

        // if record contains searches, the count is added else count is set as 0
        const data = Array.isArray(dateCount) ? dateCount[1] : 0;
        return [...acc, { data, isWeekend: cur.isWeekend }];

      }, []);

      // calculate row total and add to the array
      const total = row.map((item) => Number.isInteger(parseInt(item.data)) ? parseInt(item.data) : 0).reduce((a, b) => a + b, 0);
      row.push({ data: total });

      // add user to row
      row.unshift({ data: user });

      return row;
    });

    // entry point to creating rows in table that loops through data received to
    const rows = Object.values(record).map((val, index) => {
      return rowBuilder(Object.entries(val), Object.keys(record)[index]);
    });

    // calculate column totals
    const colTotals = rows.reduce((acc, cur) => acc.map((column, i) => {
      return { 'data': column.data + cur[i].data };
    }));

    // only add totals row if more than one result
    const finalTableArray = colTotals === rows[0] ? rows : [...rows, colTotals];
    if (finalTableArray.length > 1) {
      colTotals[0].data = 'Day totals';
    }

    // add labels to header
    dateArr.unshift({ data: '' });
    dateArr.push({ data: 'Total' }) ;

    return { header: dateArr, rows: finalTableArray };
  }
}

module.exports = UserActivityService;
