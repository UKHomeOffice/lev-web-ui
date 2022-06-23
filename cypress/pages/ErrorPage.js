'use strict';

const Page = require('./Page');

class ErrorPage extends Page {

  /**
   * Navigate to error page
   */
  static visit(url, status = 404) {
    cy.request({ url, failOnStatusCode: false }).its('status').should('equal', status);
    cy.visit(url, { failOnStatusCode: false });
  }

  /**
   * Check the error page has a "Start Again" button
   */
  static startAgainButtonExists() {
    cy.get('#startAgain').contains('Start again');
  }

  /**
   * Click the "Start Again" button
   */
  static clickStartAgainButton() {
    cy.get('#startAgain').click();
  }
}

module.exports = ErrorPage;
