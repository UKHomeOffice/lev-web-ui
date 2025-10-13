'use strict';

const ServiceNotificationsController = require('../../controllers/ServiceNotificationsController');

module.exports = {
  '/': {
    entryPoint: true,
    controller: ServiceNotificationsController
  },
  '/enter-message': {
    entryPoint: true,
    controller: ServiceNotificationsController
  },
  '/summary': {
    entryPoint: true,
    controller: ServiceNotificationsController
  }
};