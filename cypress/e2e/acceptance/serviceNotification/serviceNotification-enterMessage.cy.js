'use strict'

const LoginPage = require("../../../pages/LoginPage");
const ServiceNotificationEnterMessagePage = require("../../../pages/serviceNotification/serviceNotificationEnterMessagePage");

describe('Service notification enter message page', () => {
  before(() => {
    LoginPage.login();
  });

  describe('When page is opened', () => {
    before(() => {
      ServiceNotificationEnterMessagePage.visit();
    });

    it('returns an enter message page', () => {
      ServiceNotificationEnterMessagePage.shouldBeVisible();
    });

    it('has expected header', () => {
      ServiceNotificationEnterMessagePage.hasExpectedTitle();
    });

    it('contains a back link to the index page', () => {
      ServiceNotificationEnterMessagePage.hasBackLink();
    });

    it('contains a back button to the index page', () => {
      ServiceNotificationEnterMessagePage.hasBackButton();
    });

    it('contains a continue button', () => {
      ServiceNotificationEnterMessagePage.hasContinueButton();
    });

    it('contains a char count text area', () => {
      ServiceNotificationEnterMessagePage.hasCharCountTextArea();
    });
  });

  describe('When invalid message is submitted', () => {
    before(() => {
      ServiceNotificationEnterMessagePage.visit();
    });

    it('with no message, error should be returned', () => {
      ServiceNotificationEnterMessagePage.enterMessage('');
      cy.get('.govuk-error-summary.error-summary').should('exist');
      cy.get('.error-summary').contains('There is a problem');
      cy.get('.govuk-error-summary__list > li').contains('Enter message');
    });

    it('with invalid special character message, error should be returned', () => {
      ServiceNotificationEnterMessagePage.enterMessage('*@/');
      cy.get('.govuk-error-summary.error-summary').should('exist');
      cy.get('.error-summary').contains('There is a problem');
      cy.get('.govuk-error-summary__list > li').contains('Message can only include letters, numbers and punctuation (:,.?!-)');
    });

    it('with over 150 characters, error should be returned', () => {
      ServiceNotificationEnterMessagePage.enterMessage('a'.repeat(151));
      cy.get('.govuk-error-summary.error-summary').should('exist');
      cy.get('.error-summary').contains('There is a problem');
      cy.get('.govuk-error-summary__list > li').contains('Message must be 150 characters or less');
    });
  });

  describe('When valid message is submitted', () => {
    before(() => {
      ServiceNotificationEnterMessagePage.visit();
    });

    it('should go to summary page', () => {
      const message = 'New Message';
      ServiceNotificationEnterMessagePage.enterMessage(message);
      ServiceNotificationEnterMessagePage.shouldRedirectToSummaryPage(message);
    });
  });
});