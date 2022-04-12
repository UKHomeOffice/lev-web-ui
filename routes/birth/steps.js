const BirthResultsController = require('../../controllers/BirthResultsController');
const BirthSearchController = require('../../controllers/BirthSearchController');

module.exports = {
  '/': {
    entryPoint: true,
    resetJourney: true,
    fields: ['system-number', 'surname', 'forenames', 'dob'],
    controller: BirthSearchController,
    next: 'results'
  },
  '/results': {
    controller: BirthResultsController,
    next: 'details'
  },
  '/details': {
  }
};
