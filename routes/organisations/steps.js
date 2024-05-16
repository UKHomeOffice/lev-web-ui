'use strict';

const OrganisationsController = require('../../controllers/OrganisationsController');

module.exports = {
  '/': {
    entryPoint: true,
    resetJourney: true,
    skip: true,
    next: '/:id'
  },
  '/:id': {
    controller: OrganisationsController,
    entryPoint: true,
    template: '/index.html'
  }
};
