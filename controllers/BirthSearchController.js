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
      BirthSearchService.searchById({systemNumber}, (data) => {
        req.sessionModel.set('searchResults', [data]);
        super.saveValues(req, res, next);
      });
    } else {

      // searchByName
      BirthSearchService.searchByName({forenames, surname, dateOfBirth}, (data) => {
        req.sessionModel.set('searchResults', data);
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
