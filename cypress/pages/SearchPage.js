'use strict';

const Page = require('./Page');

class SearchPage extends Page {

  /**
   * Type the value into the selected field, or clear it.
   * @param selector
   * @param value
   */
  static setText(selector, value) {
    if (value) {
      cy.get(selector).type(value);
    }
  }

  /**
   * Submit the search
   */
  static submit() {
    cy.get('#search').click();
  }

  /**
   * Check the expected error title is displayed
   */
  static hasErrorTitle() {
    cy.get('.error-summary').contains('Fix the following error');
  }

  /**
   * Check the expected error message is displayed
   * @param message
   */
  static hasErrorMessage(message) {
    cy.get('.govuk-error-summary__list > li').contains(message);
  }

  /**
   * Check the system number hint is visible
   */
  static hasSystemNumberHint() {
    cy.get('#system-number-hint').should('exist');
  }

  /**
   * Check the surname field has focus
   */
  static hasSurnameFocused() {
    cy.get('#surname').should('have.focus');
  }

  /**
   * Check the forenames field has focus
   */
  static hasForenamesFocused() {
    cy.get('#forenames').should('have.focus');
  }

}

module.exports = SearchPage;
