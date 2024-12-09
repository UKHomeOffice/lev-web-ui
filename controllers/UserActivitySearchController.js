'use strict';

const DateController = require('./DateController');
const UserActivityService = require('../services/UserActivityService');
const { DateTime } = require('luxon');
const requestOptions = require("../helpers/requestOptions");
const { api } = require("../config");

class UserActivitySearchController extends DateController {

  /**
   * Get the form values and query the api
   *
   * @param req
   * @param _res
   * @param next
   */
  async validate(req, _res, next) {

    // Get the values from the search form
    const from = req.form.values['dateFrom'];
    const to = req.form.values['dateTo'];
    const user = req.form.values['userFilter'] || undefined;
    const includeWeekends = req.form.values['weekendCheckbox'] || false;

    // api only returns up to the 'to' date, so an extra day required to include the given day
    const toPlusOneDay = DateTime.fromISO(to).plus({ day: 1 }).toISODate();

    try {

      const records = await UserActivityService.searchByParams({
        ...requestOptions(req, api),
        url: '/api/v0/audit/user-activity',
        searchParams: { from, to: toPlusOneDay, user },
        includeWeekends
      });
      req.sessionModel.set('searchResults', records);

      next();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserActivitySearchController;
