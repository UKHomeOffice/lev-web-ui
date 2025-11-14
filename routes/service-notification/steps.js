'use strict';

const ServiceNotificationsController = require('../../controllers/ServiceNotificationsController');

module.exports = {
  '/': {
    entryPoint: true,
    controller: ServiceNotificationsController,
    template: '/index.html',
    next: '/admin/notify-users/enter-message'
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
    fields: ['submittedNotification'],
    controller: ServiceNotificationsController,
    template: '/summary.html',
    next: '/admin/notify-users'
  },
  '/delete-notification': {
    entryPoint: true,
    controller: ServiceNotificationsController,
    next: '/admin/notify-users'
  }
};