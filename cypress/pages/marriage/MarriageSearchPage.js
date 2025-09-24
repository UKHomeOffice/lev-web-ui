'use strict';

const SearchPage = require('../SearchPage');

class MarriageSearchPage extends SearchPage {

  /**
   * Navigate to marriage registration search page
   */
  static visit() {
    cy.visit('/marriage', {failOnStatusCode: false});
  }

  /**
   * Check marriage registrations search page is visible
   */
  static shouldBeVisible() {

    // Has title
    cy.get('h1').contains('Find a marriage record');

    // Has labels
    cy.get('label[for=entry-number]').contains('System or entry number');
    cy.get('label[for=surname]').contains('Last name');
    cy.get('label[for=forenames]').contains('First and middle name');
    cy.get('label[for=dom-day]').contains('Day');
    cy.get('label[for=dom-month]').contains('Month');
    cy.get('label[for=dom-year]').contains('Year');

    // Has hint
    cy.get('#entry-number-hint').should('exist');
  }

  /**
   * Perform a marriage registration search with the given params
   *
   * @param entryNumber
   * @param surname
   * @param forenames
   * @param dom
   */
  static performSearch({
    entryNumber,
    surname,
    forenames,
    dom
  }) {
    this.setText('#entry-number', entryNumber);
    this.setText('#surname', surname);
    this.setText('#forenames', forenames);
    this.setText('#dom-day', dom && dom.day);
    this.setText('#dom-month', dom && dom.month);
    this.setText('#dom-year', dom && dom.year);
    this.submit();
  }

  /**
   * Check the search page has the expected values
   *
   * @param entryNumber
   * @param surname
   * @param forenames
   * @param dom
   */
  static hasExpectedValues({
    entryNumber,
    surname,
    forenames,
    dom
  }) {
    cy.get('#entry-number').should('have.value', entryNumber);
    cy.get('#surname').should('have.value', surname);
    cy.get('#forenames').should('have.value', forenames);
    cy.get('#dom-day').should('have.value', dom.day);
    cy.get('#dom-month').should('have.value', dom.month);
    cy.get('#dom-year').should('have.value', dom.year);
  }

  static invalidDOMDay() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Day can only contain digits');
    cy.get('#dom-error.govuk-error-message').should('exist');
  }

  static invalidDOMMonth() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Month can only contain digits');
    cy.get('#dom-error.govuk-error-message').should('exist');
  }

  static invalidDOMYear() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Year can only contain digits');
    cy.get('#dom-error.govuk-error-message').should('exist');
  }

  static domInFuture() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Date of marriage must be in the past');
    cy.get('#dom-error.govuk-error-message').should('exist');
  }

  static domMonthOutOfRange() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Month must be between 1 and 12');
    cy.get('#dom-error.govuk-error-message').should('exist');
  }

  static domDayOutOfRange28() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Date must be between 1 and 28');
    cy.get('#dom-error.govuk-error-message').should('exist');
  }

  static domDayOutOfRange29() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Date must be between 1 and 29');
    cy.get('#dom-error.govuk-error-message').should('exist');
  }

  static domDayOutOfRange30() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Date must be between 1 and 30');
    cy.get('#dom-error.govuk-error-message').should('exist');
  }

  static domDayOutOfRange31() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Date must be between 1 and 31');
    cy.get('#dom-error.govuk-error-message').should('exist');
  }

  static domYearMustHaveFourDigits() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Year must be 4 digits long');
    cy.get('#dom-error.govuk-error-message').should('exist');
  }
}

module.exports = MarriageSearchPage;
