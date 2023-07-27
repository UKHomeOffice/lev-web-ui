'use strict';

const SearchPage = require('../SearchPage');

class PartnershipSearchPage extends SearchPage {

  /**
   * Navigate to civil partnership registration search page
   */
  static visit() {
    cy.visit('/partnership/search');
  }

  /**
   * Check civil partnership registrations search page is visible
   */
  static shouldBeVisible() {

    // Has title
    cy.get('h1').contains('Applicant\'s details');

    // Has labels
    cy.get('label[for=system-number]').contains('System number from civil partnership certificate');
    cy.get('label[for=surname]').contains('Surname');
    cy.get('label[for=forenames]').contains('Forename(s)');
    cy.get('label[for=dop-day]').contains('Day');
    cy.get('label[for=dop-month]').contains('Month');
    cy.get('label[for=dop-year]').contains('Year');
  }

  /**
   * Perform a civil partnership registration search with the given params
   *
   * @param systemNumber
   * @param surname
   * @param forenames
   * @param dop
   */
  static performSearch({
    systemNumber,
    surname,
    forenames,
    dop
  }) {
    this.setText('#system-number', systemNumber);
    this.setText('#surname', surname);
    this.setText('#forenames', forenames);
    this.setText('#dop-day', dop && dop.day);
    this.setText('#dop-month', dop && dop.month);
    this.setText('#dop-year', dop && dop.year);
    this.submit();
  }

  /**
   * Check the search page has the expected values
   *
   * @param systemNumber
   * @param surname
   * @param forenames
   * @param dop
   */
  static hasExpectedValues({
    systemNumber,
    surname,
    forenames,
    dop
  }) {
    cy.get('#system-number').should('have.value', systemNumber);
    cy.get('#surname').should('have.value', surname);
    cy.get('#forenames').should('have.value', forenames);
    cy.get('#dop-day').should('have.value', dop.day);
    cy.get('#dop-month').should('have.value', dop.month);
    cy.get('#dop-year').should('have.value', dop.year);
  }

  static invalidDOPDay() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Enter a day using numbers only');
    cy.get('#dop-error.govuk-error-message').should('exist');
  }

  static invalidDOPMonth() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Enter a month using numbers only');
    cy.get('#dop-error.govuk-error-message').should('exist');
  }

  static invalidDOPYear() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Enter a year using numbers only');
    cy.get('#dop-error.govuk-error-message').should('exist');
  }

  static dopInFuture() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Please enter a date of civil partnership in the past');
    cy.get('#dop-error.govuk-error-message').should('exist');
  }
}

module.exports = PartnershipSearchPage;
