'use strict';

const DeathSearchController = require('../../controllers/DeathSearchController');
const DeathResultsController = require('../../controllers/DeathResultsController');
const DeathDetailsController = require('../../controllers/DeathDetailsController');

module.exports = {
  '/': {
    entryPoint: true,
    resetJourney: true,
    skip: true,
    next: 'search'
  },
  '/search': {
    fields: ['system-number', 'surname', 'forenames', 'dobd'],
    controller: DeathSearchController,
    next: [
      { fn: 'isSingleResult', next: 'details' },
      'results'
    ]
  },
  '/results': {
    controller: DeathResultsController,
    next: 'details',
    noPost: true
  },
  '/details': {
    controller: DeathDetailsController
  },
  '/details/:id': {
    entryPoint: true,
    controller: DeathDetailsController,
    template: 'details'
  }
};
