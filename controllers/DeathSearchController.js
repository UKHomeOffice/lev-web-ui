'use strict';

const DateController = require('./DateController');
const DeathSearchService = require('../services/DeathSearchService');

class DeathSearchController extends DateController {

  /**
   * Get the form values and query the api
   *
   * @param req
   * @param _res
   * @param next
   */
  async validate(req, _res, next) {

    // Get the values from the search form
    const systemNumber = req.form.values['system-number'];
    const surname = req.form.values['surname'];
    const forenames = req.form.values['forenames'];
    const date = req.form.values['dobd'];

    // If systemNumber exists, perform searchById otherwise perform searchByName
    if (systemNumber && systemNumber !== '') {

      try {

        // searchById
        const record = await DeathSearchService.searchById({
          ...this.getOptions(req),
          url: `/v1/registration/death/${systemNumber}`
        });

        req.sessionModel.set('searchResults', record ? [record] : []);
        req.sessionModel.set('currentRecord', record ? 0 : -1);

        next();
      } catch (err) {
        next(err);
      }
    } else {

      // searchByName
      try {
        const searchResults = await DeathSearchService.searchByName({
          ...this.getOptions(req),
          url: '/v1/registration/death',
          searchParams: { forenames, surname, date }
        });

        req.sessionModel.set('searchResults', searchResults);
        req.sessionModel.set('currentRecord', searchResults.length === 0 ? -1 : 0);

        next();
      } catch (err) {
        next(err);
      }
    }
  }

  /**
   * Returns true if we only have 1 result, otherwise false
   * @param req
   * @param _res
   * @param _con
   * @returns {*|boolean}
   */
  isSingleResult(req, _res, _con) {
    const searchResults = req.sessionModel.get('searchResults') || [];

    return searchResults && searchResults.length === 1;
  }
}

module.exports = DeathSearchController;
