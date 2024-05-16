'use strict';

const OrganisationController = require('../../controllers/UserManagement/OrganisationController');

module.exports = {
  '/': {
    entryPoint: true,
    resetJourney: true,
    skip: true,
    next: '/:id'
  },
  '/:id': {
    controller: OrganisationController,
    entryPoint: true,
    template: '/index.html'
  }
};
