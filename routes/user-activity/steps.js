'use strict';

const UserActivitySearchController = require('../../controllers/UserActivitySearchController');
const UserActivityResultsController = require('../../controllers/UserActivityResultsController');

module.exports = {
  '/': {
    entryPoint: true,
    resetJourney: true,
    skip: true,
    next: 'search'
  },
  '/search': {
    fields: ['dateFrom', 'dateTo', 'userFilter', 'weekendCheckbox'],
    controller: UserActivitySearchController,
    next: 'results'
  },
  '/results': {
    controller: UserActivityResultsController,
    noPost: true
  }
};
