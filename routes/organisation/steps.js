'use strict';

const OrganisationController = require('../../controllers/UserManagement/OrganisationController');
const OrganisationsController = require('../../controllers/UserManagement/OrganisationsController');
const TeamController = require('../../controllers/UserManagement/TeamController');
const TeamCreateController = require('../../controllers/UserManagement/TeamCreateController');
const TeamEditController = require('../../controllers/UserManagement/TeamEditController');
const UserController = require('../../controllers/UserManagement/UserController');
const DeleteUserController = require('../../controllers/UserManagement/DeleteUserController');
const UserEditController = require('../../controllers/UserManagement/UserEditController');
const ResetUserPasswordController = require('../../controllers/UserManagement/ResetUserPasswordController');
const UserCreateController = require('../../controllers/UserManagement/UserCreateController');
const OrganisationCreateController = require('../../controllers/UserManagement/OrganisationCreateController');
const OrganisationEditController = require('../../controllers/UserManagement/OrganisationEditController');

const externalRoutes = {
  '/': {
    controller: OrganisationsController,
    entryPoint: true,
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
  '/:orgId/user/create': {
    fields: ['firstName', 'lastName', 'email', 'teamSelect'],
    controller: UserCreateController,
    entryPoint: true,
    template: '/user-create.html'
  },
  '/:orgId/team/:teamId/user/:username': {
    controller: UserController,
    entryPoint: true,
    template: '/user.html'
  },
  '/:orgId/team/:teamId/user/:username/delete/confirm': {
    controller: UserController,
    entryPoint: true,
    template: '/delete-user.html'
  },
  '/:orgId/team/:teamId/user/:username/delete': {
    controller: DeleteUserController,
    entryPoint: true,
    skip: true
  },
  '/:orgId/team/:teamId/user/:username/modify': {
    fields: ['firstName', 'lastName', 'teamSelect'],
    controller: UserEditController,
    entryPoint: true,
    template: '/user-edit.html'
  },
  '/:orgId/team/:teamId/user/:username/reset-password': {
    controller: ResetUserPasswordController,
    entryPoint: true,
    skip: true
  }
};

const internalRoutes = {
  '/create': {
    fields: ['organisationName'],
    controller: OrganisationCreateController,
    entryPoint: true,
    template: '/add-edit-organisation.html'
  },
  '/:orgId/edit': {
    fields: ['organisationName'],
    controller: OrganisationEditController,
    entryPoint: true,
    template: '/add-edit-organisation.html'
  },
  '/:orgId/team/create': {
    controller: TeamCreateController,
    fields: ['teamName', 'permissionCheckboxes'],
    entryPoint: true,
    template: '/add-edit-team.html'
  },
  '/:orgId/team/:teamId/edit': {
    controller: TeamEditController,
    fields: ['teamName', 'permissionCheckboxes'],
    entryPoint: true,
    template: '/add-edit-team.html'
  }
};

module.exports = { externalRoutes, internalRoutes };