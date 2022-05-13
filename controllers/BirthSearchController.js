'use strict';

const SearchController = require('./SearchController');
const BirthSearchService = require('../services/BirthSearchService');

class BirthSearchController extends SearchController {

  /**
   * Get the form values and query the api
   *
   * @param req
   * @param res
   * @param next
   */
  saveValues(req, res, next) {

    // Get the values from the search form
    const systemNumber = req.form.values['system-number'];
    const surname = req.form.values['surname'];
    const forenames = req.form.values['forenames'];
    const dateOfBirth = req.form.values['dob'];

    // If systemNumber exists, perform searchById otherwise perform searchByName
    if (systemNumber && systemNumber !== '') {

      // searchById
      BirthSearchService.searchById({
        headers: this.getHeaders(req),
        url: `/v1/registration/birth/${systemNumber}`
      }, (data) => {
        req.sessionModel.set('searchResults', data);

        if (data.length === 0) {
          req.sessionModel.unset('currentRecord');
        } else {
          req.sessionModel.set('currentRecord', 0);
        }

        super.saveValues(req, res, next);
      });
    } else {

      // searchByName
      BirthSearchService.searchByName({
        headers: this.getHeaders(req),
        url: '/v1/registration/birth',
        searchParams: { forenames, surname, dateOfBirth }
      }, (data) => {
        req.sessionModel.set('searchResults', data);

        if (data.length === 0) {
          req.sessionModel.unset('currentRecord');
        } else {
          req.sessionModel.set('currentRecord', 0);
        }

        super.saveValues(req, res, next);
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
    const searchResults = req.sessionModel.get('searchResults');

    return searchResults && searchResults.length === 1;
  }
}

module.exports = BirthSearchController;
