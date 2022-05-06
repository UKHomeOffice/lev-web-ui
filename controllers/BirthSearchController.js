'use strict';

const SearchController = require('./SearchController');
const BirthSearchService = require('../services/BirthSearchService');

class BirthSearchController extends SearchController {
  saveValues(req, res, next) {
    const systemNumber = req.form.values['system-number'];
    const surname = req.form.values['surname'];
    const forenames = req.form.values['forenames'];
    const dateOfBirth = req.form.values['dob'];

    if (systemNumber && systemNumber !== '') {
      BirthSearchService.searchById({systemNumber}, (data) => {
        req.sessionModel.set('searchResults', [data]);
      });
    } else {
      BirthSearchService.searchByName({forenames, surname, dateOfBirth}, (data) => {
        req.sessionModel.set('searchResults', data);
      });
    }

    super.saveValues(req, res, next);
  }

  conditionMethod(req, _res, _con) {
    const searchResults = req.sessionModel.get('searchResults');

    return searchResults && searchResults.length === 1;
  }
}

module.exports = BirthSearchController;
