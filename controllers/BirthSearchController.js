'use strict';

const SearchController = require('./SearchController');
const BirthSearchService = require('../services/BirthSearchService');

class BirthSearchController extends SearchController {
  saveValues(req, res, next) {
    const searchResults = BirthSearchService.search({
      systemNumber: req.form.values['system-number'],
      surname: req.form.values['surname'],
      forenames: req.form.values['forenames'],
      dob: req.form.values['dob'],
    });

    req.sessionModel.set('searchResults', searchResults);

    super.saveValues(req, res, next);
  }

  conditionMethod(req, res, con) {
    const searchResults = req.sessionModel.get('searchResults');

    return searchResults && searchResults.length === 1;
  }
}

module.exports = BirthSearchController;
