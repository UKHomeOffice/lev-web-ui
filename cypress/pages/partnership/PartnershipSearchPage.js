'use strict';

const SearchPage = require('../SearchPage');

class PartnershipSearchPage extends SearchPage {

  /**
   * Navigate to civil partnership registration search page
   */
  static visit() {
    cy.visit('/partnership', {failOnStatusCode: false});
  }

  /**
   * Check civil partnership registrations search page is visible
   */
  static shouldBeVisible() {

    // Has title
    cy.get('h1').contains('Find a civil partnership record');

    // Has labels
    cy.get('label[for=entry-number]').contains('Entry number');
    cy.get('label[for=surname]').contains('Last name');
    cy.get('label[for=forenames]').contains('First and middle name');
    cy.get('label[for=dop-day]').contains('Day');
    cy.get('label[for=dop-month]').contains('Month');
    cy.get('label[for=dop-year]').contains('Year');

    // Has hint
    cy.get('#entry-number-hint').should('exist');
  }

  /**
   * Perform a civil partnership registration search with the given params
   *
   * @param entryNumber
   * @param surname
   * @param forenames
   * @param dop
   */
  static performSearch({
    entryNumber,
    surname,
    forenames,
    dop
  }) {
    this.setText('#entry-number', entryNumber);
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
   * @param entryNumber
   * @param surname
   * @param forenames
   * @param dop
   */
  static hasExpectedValues({
    entryNumber,
    surname,
    forenames,
    dop
  }) {
    cy.get('#entry-number').should('have.value', entryNumber);
    cy.get('#surname').should('have.value', surname);
    cy.get('#forenames').should('have.value', forenames);
    cy.get('#dop-day').should('have.value', dop.day);
    cy.get('#dop-month').should('have.value', dop.month);
    cy.get('#dop-year').should('have.value', dop.year);
  }

  static invalidLengthSystemNumber() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('System number must contain 9 digits');
  }

  static noSearchCriteria() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Enter last name');
    cy.get('.govuk-error-summary__list > li').contains('Enter first name. Middle name is optional');
    cy.get('.govuk-error-summary__list > li').contains('Please enter a date of birth or death');
  }

  static invalidSurname() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Last name must be 30 characters or less');
    cy.get('.govuk-error-summary__list > li').contains('First and middle name must be 30 characters or less');
    cy.get('.govuk-error-message').contains('Last name must be 30 characters or less');
    cy.get('.govuk-error-message').contains('First and middle name must be 30 characters or less');
  }

  static forenameSurnameLettersOnly() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Last name can only contain letters');
    cy.get('.govuk-error-summary__list > li').contains('First and middle name can only contain letters');
    cy.get('.govuk-error-message').contains('Last name can only contain letters');
    cy.get('.govuk-error-message').contains('First and middle name can only contain letters');
  }

  static invalidDOPDay() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Day can only contain digits');
    cy.get('#dop-error.govuk-error-message').should('exist');
  }

  static invalidDOPMonth() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Month can only contain digits');
    cy.get('#dop-error.govuk-error-message').should('exist');
  }

  static invalidDOPYear() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Year can only contain digits');
    cy.get('#dop-error.govuk-error-message').should('exist');
  }

  static dopInFuture() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Date of civil partnership must be in the past');
    cy.get('#dop-error.govuk-error-message').should('exist');
  }

  static dopMonthOutOfRange() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Month must be between 1 and 12');
    cy.get('#dop-error.govuk-error-message').should('exist');
  }

  static dopDayOutOfRange28() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Date must be between 1 and 28');
    cy.get('#dop-error.govuk-error-message').should('exist');
  }

  static dopDayOutOfRange29() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Date must be between 1 and 29');
    cy.get('#dop-error.govuk-error-message').should('exist');
  }

  static dopDayOutOfRange30() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Date must be between 1 and 30');
    cy.get('#dop-error.govuk-error-message').should('exist');
  }

  static dopDayOutOfRange31() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Date must be between 1 and 31');
    cy.get('#dop-error.govuk-error-message').should('exist');
  }

  static dopYearMustHaveFourDigits() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Year must be 4 digits long');
    cy.get('#dop-error.govuk-error-message').should('exist');
  }
}

module.exports = PartnershipSearchPage;
