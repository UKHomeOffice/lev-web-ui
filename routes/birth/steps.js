const BirthResultsController = require('../../controllers/BirthResultsController');

module.exports = {
  '/': {
    entryPoint: true,
    resetJourney: true,
    fields: ['system-number', 'surname', 'forenames', 'dob'],
    next: 'results'
  },
  '/results': {
    controller: BirthResultsController,
    next: 'details'
  },
  '/details': {
  }
};
