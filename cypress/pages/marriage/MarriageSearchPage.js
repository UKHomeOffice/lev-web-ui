'use strict';

const SearchPage = require('../SearchPage');

class MarriageSearchPage extends SearchPage {

  /**
   * Navigate to marriage registration search page
   */
  static visit() {
    cy.visit('/marriage');
  }

  /**
   * Check marriage registrations search page is visible
   */
  static shouldBeVisible() {

    // Has title
    cy.get('h1').contains('Applicant\'s details');

    // Has labels
    cy.get('label[for=system-number]').contains('System number from marriage certificate');
    cy.get('label[for=surname]').contains('Surname');
    cy.get('label[for=forenames]').contains('Forename(s)');
    cy.get('label[for=dom-day]').contains('Day');
    cy.get('label[for=dom-month]').contains('Month');
    cy.get('label[for=dom-year]').contains('Year');
  }

  /**
   * Perform a marriage registration search with the given params
   *
   * @param systemNumber
   * @param surname
   * @param forenames
   * @param dom
   */
  static performSearch({
    systemNumber,
    surname,
    forenames,
    day,
    month,
    year
  }) {
    this.setText('#system-number', systemNumber);
    this.setText('#surname', surname);
    this.setText('#forenames', forenames);
    this.setText('#dom-day', day);
    this.setText('#dom-month', month);
    this.setText('#dom-year', year);
    this.submit();
  }

  /**
   * Check the date of marriage hint is visible
   */
  static hasDateOfMarriageHint() {
    cy.get('#dom-extended-hint').should('exist');
  }

  /**
   * Check the search page has the expected values
   *
   * @param systemNumber
   * @param surname
   * @param forenames
   * @param dom
   */
  static hasExpectedValues({
    systemNumber,
    surname,
    forenames,
  }) {
    cy.get('#system-number').should('have.value', systemNumber);
    cy.get('#surname').should('have.value', surname);
    cy.get('#forenames').should('have.value', forenames);
    cy.get('label[for=dom-day]').contains('Day');
    cy.get('label[for=dom-month]').contains('Month');
    cy.get('label[for=dom-year]').contains('Year');
  }

  static invalidDOMDay() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Enter a day using numbers only');
    cy.get('#dom-error.govuk-error-message').should('exist');
  }

  static invalidDOMMonth() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Enter a month using numbers only');
    cy.get('#dom-error.govuk-error-message').should('exist');
  }

  static invalidDOMYear() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Enter a year using numbers only');
    cy.get('#dom-error.govuk-error-message').should('exist');
  }

  static domInFuture() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Please enter a date of marriage in the past');
    cy.get('#dom-error.govuk-error-message').should('exist');
  }

  static domBeforeRecordsBegan() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Please enter a date after our records began (1 July 2009)');
    cy.get('#dom-error.govuk-error-message').should('exist');
  }
}

module.exports = MarriageSearchPage;
