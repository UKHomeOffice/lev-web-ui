'use strict';

const SearchPage = require('../SearchPage');

class BirthSearchPage extends SearchPage {

  /**
   * Navigate to birth registration search page
   */
  static visit() {
    cy.visit('/');
  }

  /**
   * Check birth registrations search page is visible
   */
  static shouldBeVisible() {

    // Has title
    cy.get('h1').contains('Applicant\'s details');

    // Has focus
    cy.get('#system-number').focus().should('have.focus');

    // Has labels
    cy.get('label[for=system-number]').contains('System number from birth certificate');
    cy.get('label[for=surname]').contains('Surname');
    cy.get('label[for=forenames]').contains('Forename(s)');
    cy.get('label[for=dob-day]').contains('Day');
    cy.get('label[for=dob-month]').contains('Month');
    cy.get('label[for=dob-year]').contains('Year');
  }
}

module.exports = BirthSearchPage;
