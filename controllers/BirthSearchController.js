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
}

module.exports = BirthSearchController;
