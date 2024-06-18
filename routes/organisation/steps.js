'use strict';

const OrganisationController = require('../../controllers/UserManagement/OrganisationController');
const OrganisationsController = require('../../controllers/UserManagement/OrganisationsController');

module.exports = {
  '/': {
    controller: OrganisationsController,
    entryPoint: true,
    resetJourney: true,
    template: '/organisations.html',
    next: '/:id'
  },
  '/:id': {
    controller: OrganisationController,
    entryPoint: true,
    template: '/index.html'
  }
};
