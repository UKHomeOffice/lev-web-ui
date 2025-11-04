'use strict';

const ServiceNotificationsController = require('../../controllers/ServiceNotificationsController');

module.exports = {
  '/': {
    entryPoint: true,
    controller: ServiceNotificationsController,
    template: '/index.html'
  },
  '/enter-message': {
    fields: ['newNotification'],
    entryPoint: true,
    controller: ServiceNotificationsController,
    template: '/enter-message.html',
    next: '/admin/notify-users/summary'
  },
  '/summary': {
    entryPoint: true,
    controller: ServiceNotificationsController,
    template: '/summary.html',
    next: '/admin/notify-users'
  }
};