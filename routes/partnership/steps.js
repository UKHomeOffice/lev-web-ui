'use strict';

const PartnershipSearchController = require('../../controllers/PartnershipSearchController');
const PartnershipResultsController = require('../../controllers/PartnershipResultsController');
const PartnershipDetailsController = require('../../controllers/PartnershipDetailsController');

module.exports = {
  '/': {
    entryPoint: true,
    resetJourney: true,
    skip: true,
    next: 'search'
  },
  '/search': {
    fields: ['system-number', 'surname', 'forenames', 'dop'],
    controller: PartnershipSearchController,
    next: [
      { fn: 'isSingleResult', next: 'details' },
      'results'
    ]
  },
  '/results': {
    controller: PartnershipResultsController,
    next: 'details',
    noPost: true
  },
  '/details': {
    controller: PartnershipDetailsController
  },
  '/details/:id': {
    entryPoint: true,
    controller: PartnershipDetailsController,
    template: 'details'
  }
};
