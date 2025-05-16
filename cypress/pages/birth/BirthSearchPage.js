'use strict';

const SearchPage = require('../SearchPage');

class BirthSearchPage extends SearchPage {

  /**
   * Navigate to birth registration search page
   */
  static visit() {
    cy.visit('/birth');
  }

  /**
   * Check birth registrations search page is visible
   */
  static shouldBeVisible() {

    // Has title
    cy.get('h1').contains('Applicant\'s details');

    // Has labels
    cy.get('label[for=system-number]').contains('System number from birth certificate');
    cy.get('label[for=surname]').contains('Surname');
    cy.get('label[for=forenames]').contains('Forename(s)');
    cy.get('label[for=dob-day]').contains('Day');
    cy.get('label[for=dob-month]').contains('Month');
    cy.get('label[for=dob-year]').contains('Year');
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
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Please enter a surname');
    cy.get('.govuk-error-summary__list > li').contains('Please enter at least one forename');
    cy.get('.govuk-error-summary__list > li').contains('Please enter a date of birth');
  }

  static noSystemNumber() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Please enter a number');
    cy.get('#birth-system-number-hint').should('exist');
  }

  static invalidLengthSystemNumber() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('The system number should be 9 digits');
    cy.get('#birth-system-number-hint').should('exist');
  }

  static noForenames() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Please enter at least one forename');
  }

  static invalidForenames() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Forename(s): Your entry cannot exceed 30 characters');
    cy.get('.govuk-error-message').contains('Forename(s): Your entry cannot exceed 30 characters');
  }

  static noSurname() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Please enter a surname');
    cy.get('.govuk-error-summary__list > li').contains('Please enter at least one forename');
  }

  static invalidSurname() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Surname: Your entry cannot exceed 30 characters');
    cy.get('.govuk-error-summary__list > li').contains('Forename(s): Your entry cannot exceed 30 characters');
    cy.get('.govuk-error-message').contains('Surname: Your entry cannot exceed 30 characters');
    cy.get('.govuk-error-message').contains('Forename(s): Your entry cannot exceed 30 characters');
  }

  static invalidDOBDay() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Enter a day using numbers only');
    cy.get('#dob-error.govuk-error-message').should('exist');
  }

  static invalidDOBMonth() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Enter a month using numbers only');
    cy.get('#dob-error.govuk-error-message').should('exist');
  }

  static invalidDOBYear() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Enter a year using numbers only');
    cy.get('#dob-error.govuk-error-message').should('exist');
  }

  static dobInFuture() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Please enter a date of birth in the past');
    cy.get('#dob-error.govuk-error-message').should('exist');
  }

  static dobBeforeRecordsBegan() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Please enter a date after our records began (1 July 2009)');
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
