'use strict';

const OrganisationController = require('../../controllers/UserManagement/OrganisationController');
const OrganisationsController = require('../../controllers/UserManagement/OrganisationsController');
const TeamController = require('../../controllers/UserManagement/TeamController');

module.exports = {
  '/': {
    controller: OrganisationsController,
    entryPoint: true,
    resetJourney: true,
    template: '/organisations.html',
    next: '/:orgId'
  },
  '/:orgId': {
    controller: OrganisationController,
    entryPoint: true,
    template: '/index.html'
  },
  '/:orgId/team/:teamId': {
    controller: TeamController,
    entryPoint: true,
    template: '/team.html'
  }
};
