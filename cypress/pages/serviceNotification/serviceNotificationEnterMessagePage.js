'use strict'

const Page = require("../Page");

class serviceNotificationEnterMessagePage extends Page {
  static visit() {
    cy.visit('/admin/notify-users/enter-message');
  }

  /**
   * Check service notification enter message page is visible
   */
  static shouldBeVisible() {
    cy.url().should('include', '/admin/notify-users/enter-message');
  }

  /**
   * Check service notification enter message page has the expected result
   */
  static hasExpectedTitle() {
    cy.get('h1').contains('Enter message');
  }

  static hasBackButton() {
    cy.get('#back.govuk-button.govuk-button--secondary').should('exist');
  }

  static hasContinueButton() {
    cy.get('#continue.govuk-button.button').should('exist');
  }

  static hasBackLink() {
    cy.get('.govuk-back-link').should('exist');
  }

  static hasCharCountTextArea() {
    cy.get('#newNotification.govuk-textarea.govuk-js-character-count').should('exist');
  }

  static enterMessage(newNotification) {
    if(newNotification)
      cy.get('#newNotification').clear().type(newNotification);
    cy.get('#continue').click();
  }

  /**
   * Check service notification enter message page is visible
   */
  static shouldRedirectToSummaryPage(message) {
    cy.url().should('include', '/admin/notify-users/summary');
    cy.get('.govuk-table__cell').contains(message);
  }
}

module.exports = serviceNotificationEnterMessagePage;