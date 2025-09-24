'use strict';

const SearchPage = require('../SearchPage');

class BirthSearchPage extends SearchPage {

  /**
   * Navigate to birth registration search page
   */
  static visit() {
    cy.visit('/birth', {failOnStatusCode: false});
  }

  /**
   * Check birth registrations search page is visible
   */
  static shouldBeVisible() {

    // Has title
    cy.get('h1').contains('Find a birth record');

    // Has labels
    cy.get('label[for=system-number]').contains('System number');
    cy.get('label[for=surname]').contains('Last name');
    cy.get('label[for=forenames]').contains('First and middle name');
    cy.get('label[for=dob-day]').contains('Day');
    cy.get('label[for=dob-month]').contains('Month');
    cy.get('label[for=dob-year]').contains('Year');

    // Has hint
    cy.get('#system-number-hint').should('exist');
  }

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
    this.setText('#dob-day', day);
    this.setText('#dob-month', month);
    this.setText('#dob-year', year);
    this.submit();
  }

  static noSearchCriteria() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Enter last name');
    cy.get('.govuk-error-summary__list > li').contains('Enter first name. Middle name is optional');
    cy.get('.govuk-error-summary__list > li').contains('Enter date of birth');
  }

  static noSystemNumber() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Please enter a number');
    cy.get('#birth-system-number-hint').should('exist');
  }

  static invalidLengthSystemNumber() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('System number must contain 9 digits');
  }

  static noForenames() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Enter first name. Middle name is optional');
  }

  static invalidForenames() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('First and middle name must be 30 characters or less');
    cy.get('.govuk-error-message').contains('First and middle name must be 30 characters or less');
  }

  static noSurname() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Enter last name');
    cy.get('.govuk-error-summary__list > li').contains('Enter first name. Middle name is optional');
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

  static invalidDOBDay() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Day can only contain digits');
    cy.get('#dob-error.govuk-error-message').should('exist');
  }

  static invalidDOBMonth() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Month can only contain digits');
    cy.get('#dob-error.govuk-error-message').should('exist');
  }

  static invalidDOBYear() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Year can only contain digits');
    cy.get('#dob-error.govuk-error-message').should('exist');
  }

  static dobInFuture() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Date of birth must be in the past');
    cy.get('#dob-error.govuk-error-message').should('exist');
  }

  static dobBeforeRecordsBegan() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Enter a date after our records began (1 July 2009)');
    cy.get('#dob-error.govuk-error-message').should('exist');
  }

  static dobMonthOutOfRange() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Month must be between 1 and 12');
    cy.get('#dob-error.govuk-error-message').should('exist');
  }

  static dobDayOutOfRange28() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Date must be between 1 and 28');
    cy.get('#dob-error.govuk-error-message').should('exist');
  }

  static dobDayOutOfRange29() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Date must be between 1 and 29');
    cy.get('#dob-error.govuk-error-message').should('exist');
  }

  static dobDayOutOfRange30() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Date must be between 1 and 30');
    cy.get('#dob-error.govuk-error-message').should('exist');
  }

  static dobDayOutOfRange31() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Date must be between 1 and 31');
    cy.get('#dob-error.govuk-error-message').should('exist');
  }

  static dobYearMustHaveFourDigits() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Year must be 4 digits long');
    cy.get('#dob-error.govuk-error-message').should('exist');
  }

  static searchFormClear() {
    cy.get('#system-number').should('have.value', '');
    cy.get('#surname').should('have.value', '');
    cy.get('#forenames').should('have.value', '');
    cy.get('#dob').should('have.value', '');
  }

  static searchFormRetainedValues(record) {
    cy.get('#system-number').should('have.value', '');
    cy.get('#surname').should('have.value', `${record.surname}`);
    cy.get('#forenames').should('have.value', `${record.forenames}`);
    cy.get('#dob-day').should('have.value', `${record.day}`);
    cy.get('#dob-month').should('have.value', `${record.month}`);
    cy.get('#dob-year').should('have.value', `${record.year}`);
  }
}

module.exports = BirthSearchPage;
