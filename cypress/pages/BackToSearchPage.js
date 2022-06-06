'use strict';

const Page = require('./Page');

class BackToSearchPage extends Page {

  /**
   * Check "New Search" button exists
   */
  static hasNewSearchButton() {
    cy.get('#newSearch').should('exist');
  }

  /**
   * Click the "New Search button
   */
  static clickNewSearchButton() {
    cy.get('#newSearch').click();
  }

  /**
   * Check "Edit Search" button exists
   */
  static hasEditSearchButton() {
    cy.get('#editSearch').should('exist');
  }

  /**
   * Click the "Edit Search button
   */
  static clickEditSearchButton() {
    cy.get('#editSearch').click();
  }

}

module.exports = BackToSearchPage;
