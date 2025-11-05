'use strict'

const LoginPage = require("../../../pages/LoginPage");
const ServiceNotificationIndexPage = require("../../../pages/serviceNotification/serviceNotificationIndexPage");

describe('Service notification index page', () => {
  before(() => {
    LoginPage.login();
  });

  describe('When there is no message', () => {

    before(() => {
      ServiceNotificationIndexPage.visit();
    });

    it('returns an index page', () => {
      ServiceNotificationIndexPage.shouldBeVisible();
    });

    it('has expected header', () => {
      ServiceNotificationIndexPage.hasExpectedTitle();
    });

    it('table displays no live messages', () => {
      ServiceNotificationIndexPage.hasServiceNotification(null);
    });

    it('contains a breadcrumb link to the home page', () => {
      ServiceNotificationIndexPage.hasAddNotificationButton();
    });
  });
});