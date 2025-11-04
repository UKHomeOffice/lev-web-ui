'use strict'

const Page = require("../Page");
const LoginPage = require("../LoginPage");
const BirthSearchPage = require("../birth/BirthSearchPage");
const DeathSearchPage = require("../death/DeathSearchPage");
const MarriageSearchPage = require("../marriage/marriageSearchPage");
const PartnershipSearchPage = require("../partnership/PartnershipSearchPage");

class serviceNotificationSummaryPage extends Page{
  static visit() {
    cy.visit('/admin/notify-users/summary');
  }

  /**
   * Check service notification summary page is visible
   */
  static shouldBeVisible() {
    cy.url().should('include', '/admin/notify-users/summary');
  }

  /**
   * Check service notification summary page has the expected result
   */
  static hasExpectedTitle() {
    cy.get('h1').contains('Check notification details before publishing');
  }

  static hasBackButton() {
    cy.get('#back.govuk-button.govuk-button--secondary').should('exist');
  }

  static hasPublishButton() {
    cy.get('#publish.govuk-button.button').should('exist');
  }

  static hasBackLink() {
    cy.get('.govuk-back-link').should('exist');
  }

  static hasNotificationTable() {
    cy.get('.govuk-table.notification').should('exist');
  }

  static hasNotificationInTable(message) {
    cy.get('.govuk-table__cell').contains(message);
  }

  static hasChangeButtonInTable() {
    cy.get('.govuk-table__cell').contains('Change');
  }

  static shouldRedirectToEnterMessagePageWithNotification(selector, notification) {
    cy.get(selector).click();
    cy.url().should('include', '/admin/notify-users/enter-message');
    cy.get('#newNotification').contains(notification);
  }

  static shouldDisplayNotification(notification) {
    cy.get('.govuk-service-navigation__link').click();
    cy.get('.govuk-notification-banner').contains(notification);

    BirthSearchPage.visit();
    cy.get('.govuk-notification-banner').contains(notification);

    DeathSearchPage.visit();
    cy.get('.govuk-notification-banner').contains(notification);

    MarriageSearchPage.visit();
    cy.get('.govuk-notification-banner').contains(notification);

    PartnershipSearchPage.visit();
    cy.get('.govuk-notification-banner').contains(notification);
  }
}

module.exports = serviceNotificationSummaryPage;