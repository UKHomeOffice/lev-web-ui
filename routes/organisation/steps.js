'use strict';

const OrganisationController = require('../../controllers/UserManagement/OrganisationController');
const ManageOrgsController = require('../../controllers/UserManagement/ManageOrgsController');

module.exports = {
  '/': {
    controller: ManageOrgsController,
    entryPoint: true,
    resetJourney: true,
    template: '/manage.html',
    next: '/:id'
  },
  '/:id': {
    controller: OrganisationController,
    entryPoint: true,
    template: '/index.html'
  }
};
