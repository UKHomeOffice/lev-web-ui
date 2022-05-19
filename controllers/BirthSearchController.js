'use strict';

const SearchController = require('./SearchController');
const { searchById, searchByName } = require('../api');

class BirthSearchController extends SearchController {

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
    const dateOfBirth = req.form.values['dob'];

    // If systemNumber exists, perform searchById otherwise perform searchByName
    if (systemNumber && systemNumber !== '') {

      try {

        // searchById
        const searchResults = await searchById({
          ...this.getOptions(req),
          url: `/v1/registration/birth/${systemNumber}`
        });

        req.sessionModel.set('searchResults', searchResults);
        req.sessionModel.set('currentRecord', searchResults.length === 0 ? -1 : 0);

        next();
      } catch (err) {
        next(err);
      }
    } else {

      // searchByName
      try {
        const searchResults = await searchByName({
          ...this.getOptions(req),
          url: '/v1/registration/birth',
          searchParams: { forenames, surname, dateOfBirth }
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
  conditionMethod(req, _res, _con) {
    const searchResults = req.sessionModel.get('searchResults') || [];

    return searchResults && searchResults.length === 1;
  }
}

module.exports = BirthSearchController;
