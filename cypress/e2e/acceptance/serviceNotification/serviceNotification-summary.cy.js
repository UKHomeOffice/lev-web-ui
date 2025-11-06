'use strict'

const LoginPage = require("../../../pages/LoginPage");
const ServiceNotificationSummaryPage = require("../../../pages/serviceNotification/serviceNotificationSummaryPage");
const ServiceNotificationEnterMessagePage = require("../../../pages/serviceNotification/serviceNotificationEnterMessagePage");

describe('Service notification summary page', () => {
  const notification = 'Test Notification';
  before(() => {
    LoginPage.login();
  });

  describe('When page is opened', () => {
    before(() => {
      ServiceNotificationEnterMessagePage.visit();
      ServiceNotificationEnterMessagePage.enterMessage(notification);
    });

    it('returns a summary page', () => {
      ServiceNotificationSummaryPage.shouldBeVisible();
    });

    it('has expected header', () => {
      ServiceNotificationSummaryPage.hasExpectedTitle();
    });

    it('contains a back link to the enter message page', () => {
      ServiceNotificationSummaryPage.hasBackLink();
    });

    it('contains a back button to the enter message page', () => {
      ServiceNotificationSummaryPage.hasBackButton();
    });

    it('contains a continue button', () => {
      ServiceNotificationSummaryPage.hasPublishButton();
    });

    it('contains a notification table', () => {
      ServiceNotificationSummaryPage.hasNotificationTable();
    });

    it('contains a change button', () => {
      ServiceNotificationSummaryPage.hasChangeButtonInTable();
    });

    it('table contains a new notification', () => {
      ServiceNotificationSummaryPage.hasNotificationInTable(notification);
    })
  });

  describe('When back or change is clicked', () => {
    beforeEach(() => {
      ServiceNotificationEnterMessagePage.visit();
      ServiceNotificationEnterMessagePage.enterMessage(notification);
    });

    it('back button clicked, message appear in enter message page', () => {
      ServiceNotificationSummaryPage.shouldRedirectToEnterMessagePageWithNotification('#back', notification);
    });

    it('change button clicked, message appear in enter message page', () => {
      ServiceNotificationSummaryPage.shouldRedirectToEnterMessagePageWithNotification('#change', notification);
    });
  });
});