'use strict';

const BirthDetailsController = require('../../controllers/BirthDetailsController');
const BirthResultsController = require('../../controllers/BirthResultsController');
const BirthSearchController = require('../../controllers/BirthSearchController');

module.exports = {
  '/': {
    entryPoint: true,
    resetJourney: true,
    skip: true,
    next: 'search'
  },
  '/search': {
    fields: ['system-number', 'surname', 'forenames', 'dob'],
    controller: BirthSearchController,
    next: [
      { fn: 'conditionMethod', next: 'details' },
      'results'
    ]
  },
  '/results': {
    controller: BirthResultsController,
    next: 'details'
  },
  '/details': {
    controller: BirthDetailsController
  }
};
