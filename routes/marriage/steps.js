'use strict';

const MarriageSearchController = require('../../controllers/MarriageSearchController');
const MarriageResultsController = require('../../controllers/MarriageResultsController');
const MarriageDetailsController = require('../../controllers/MarriageDetailsController');

module.exports = {
  '/': {
    entryPoint: true,
    resetJourney: true,
    skip: true,
    next: 'search'
  },
  '/search': {
    fields: ['system-number', 'surname', 'forenames', 'dom'],
    controller: MarriageSearchController,
    next: [
      { fn: 'isSingleResult', next: 'details' },
      'results'
    ]
  },
  '/results': {
    controller: MarriageResultsController,
    next: 'details',
    noPost: true
  },
  '/details': {
    controller: MarriageDetailsController
  },
  '/details/:id': {
    entryPoint: true,
    controller: MarriageDetailsController,
    template: 'details'
  }
};
