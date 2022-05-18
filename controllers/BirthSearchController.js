'use strict';

const SearchController = require('./SearchController');
const SearchService = require('../services/SearchService');

class BirthSearchController extends SearchController {

  /**
   * Get the form values and query the api
   *
   * @param req
   * @param res
   * @param next
   */
  validate(req, _res, next) {

    // Get the values from the search form
    const systemNumber = req.form.values['system-number'];
    const surname = req.form.values['surname'];
    const forenames = req.form.values['forenames'];
    const dateOfBirth = req.form.values['dob'];

    // If systemNumber exists, perform searchById otherwise perform searchByName
    if (systemNumber && systemNumber !== '') {

      // searchById
      SearchService.searchById({
        ...this.getOptions(req),
        url: `/v1/registration/birth/${systemNumber}`
      }, (data) => {
        req.sessionModel.set('searchResults', data);
        req.sessionModel.set('currentRecord', data.length === 0 ? -1 : 0);

        next();
      });
    } else {

      // searchByName
      SearchService.searchByName({
        ...this.getOptions(req),
        url: '/v1/registration/birth',
        searchParams: { forenames, surname, dateOfBirth }
      }, (data) => {
        req.sessionModel.set('searchResults', data);
        req.sessionModel.set('currentRecord', data.length === 0 ? -1 : 0);

        next();
      });
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
