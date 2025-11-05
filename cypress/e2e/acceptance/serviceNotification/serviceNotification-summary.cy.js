'use strict'

const LoginPage = require("../../../pages/LoginPage");
const ServiceNotificationIndexPage = require("../../../pages/serviceNotification/serviceNotificationIndexPage");
const ServiceNotificationSummaryPage = require("../../../pages/serviceNotification/serviceNotificationSummaryPage");
const ServiceNotificationEnterMessagePage = require("../../../pages/serviceNotification/serviceNotificationEnterMessagePage");

describe('Service notification summary page', () => {
  const notification = 'Test Notification';
  before(() => {
    LoginPage.login();
  });

  describe('When page is opened', () => {
    before(() => {
      ServiceNotificationEnterMessagePage.visit()
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
      ServiceNotificationEnterMessagePage.visit()
      ServiceNotificationEnterMessagePage.enterMessage(notification);
    });

    it('back button clicked, message appear in enter message page', () => {
      ServiceNotificationSummaryPage.shouldRedirectToEnterMessagePageWithNotification('#back', notification);
    });

    it('change button clicked, message appear in enter message page', () => {
      ServiceNotificationSummaryPage.shouldRedirectToEnterMessagePageWithNotification('#change', notification);
    });
  });

  describe('When publish is clicked', () => {
    let notificationResults;

    before(() => {
      ServiceNotificationIndexPage.visit();

      cy.get('.govuk-table__cell').first().invoke('text').then((text) => {
        const currentNotification = text.trim();

        if(currentNotification !== 'No live messages') {
          notificationResults = currentNotification;
        }
      });

      ServiceNotificationEnterMessagePage.visit();
      ServiceNotificationEnterMessagePage.enterMessage(notification);
    });

    it('should display success message on index page', () => {
      cy.get('#publish').click();

      cy.url().should('include', '/admin/notify-users');

      cy.get('.govuk-notification-banner__header').contains('Success');
      cy.get('.govuk-notification-banner__content').contains('You have successfully added a notification.');
      cy.get('.govuk-notification-banner__content').contains('This will be visible in around 5 minutes.');

      ServiceNotificationSummaryPage.shouldDisplayNotification(notification);
    });

    // eslint-disable-next-line no-undef
    after(() => {
      // TODO: Use Delete Path if there was no notification to start with
      ServiceNotificationEnterMessagePage.visit();
      ServiceNotificationEnterMessagePage.enterMessage(notificationResults);
      cy.get('#publish').click();
    });
  });
});