'use strict';

const DateController = require('./DateController');
const UserActivityService = require('../services/UserActivityService');

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

    try {

      const records = await UserActivityService.searchByParams({
        ...this.getOptions(req),
        url: '/api/v0/audit/user-activity',
        searchParams: { from, to, user },
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
