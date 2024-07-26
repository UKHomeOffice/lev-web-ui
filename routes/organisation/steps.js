'use strict';

const OrganisationController = require('../../controllers/UserManagement/OrganisationController');
const OrganisationsController = require('../../controllers/UserManagement/OrganisationsController');
const TeamController = require('../../controllers/UserManagement/TeamController');
const UserController = require('../../controllers/UserManagement/UserController');

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
  },
  '/:orgId/team/:teamId/user/:username': {
    controller: UserController,
    entryPoint: true,
    template: '/user.html'
  }
};
