'use strict';

const SearchPage = require('../SearchPage');

class DeathSearchPage extends SearchPage {

  /**
   * Navigate to death registration search page
   */
  static visit() {
    cy.visit('/death', {failOnStatusCode: false});
  }

  /**
   * Check death registrations search page is visible
   */
  static shouldBeVisible() {

    // Has title
    cy.get('h1').contains('Find a death record');

    // Has labels
    cy.get('label[for=system-number]').contains('System number');
    cy.get('label[for=surname]').contains('Last name');
    cy.get('label[for=forenames]').contains('First and middle name');
    cy.get('label[for=dobd-day]').contains('Day');
    cy.get('label[for=dobd-month]').contains('Month');
    cy.get('label[for=dobd-year]').contains('Year');

    // Has hint
    cy.get('#system-number-hint').should('exist');
  }

  /**
   * Perform a death registration search with the given params
   *
   * @param systemNumber
   * @param surname
   * @param forenames
   * @param dobd
   */
  static performSearch({ systemNumber, surname, forenames, dobd }) {
    this.setText('#system-number', systemNumber);
    this.setText('#surname', surname);
    this.setText('#forenames', forenames);
    this.setText('#dobd-day', dobd && dobd.day);
    this.setText('#dobd-month', dobd && dobd.month);
    this.setText('#dobd-year', dobd && dobd.year);
    this.submit();
  }

  /**
   * Check the search page has the expected values
   *
   * @param systemNumber
   * @param surname
   * @param forenames
   * @param dobd
   */
  static hasExpectedValues({ systemNumber, surname, forenames, dobd }) {
    cy.get('#system-number').should('have.value', systemNumber);
    cy.get('#surname').should('have.value', surname);
    cy.get('#forenames').should('have.value', forenames);
    cy.get('#dobd-day').should('have.value', dobd.day);
    cy.get('#dobd-month').should('have.value', dobd.month);
    cy.get('#dobd-year').should('have.value', dobd.year);
  }

  static noSearchCriteria() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Enter last name');
    cy.get('.govuk-error-summary__list > li').contains('Enter first name. Middle name is optional');
    cy.get('.govuk-error-summary__list > li').contains('Enter date of birth or death');
  }

  static noSystemNumber() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Please enter a number');
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

  static invalidDay() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Day can only contain digits');
    cy.get('#dobd-error.govuk-error-message').should('exist');
  }

  static invalidMonth() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Month can only contain digits');
    cy.get('#dobd-error.govuk-error-message').should('exist');
  }

  static invalidYear() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Year can only contain digits');
    cy.get('#dobd-error.govuk-error-message').should('exist');
  }

  static dateInFuture() {
      cy.get('.error-summary').contains('There is a problem');
      cy.get('.govuk-error-summary__list > li').contains('Date of birth or death must be in the past');
      cy.get('#dobd-error.govuk-error-message').should('exist');
  }

  static dobdMonthOutOfRange() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Month must be between 1 and 12');
    cy.get('#dobd-error.govuk-error-message').should('exist');
  }

  static dobdDayOutOfRange28() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Date must be between 1 and 28');
    cy.get('#dobd-error.govuk-error-message').should('exist');
  }

  static dobdDayOutOfRange29() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Date must be between 1 and 29');
    cy.get('#dobd-error.govuk-error-message').should('exist');
  }

  static dobdDayOutOfRange30() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Date must be between 1 and 30');
    cy.get('#dobd-error.govuk-error-message').should('exist');
  }

  static dobdDayOutOfRange31() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Date must be between 1 and 31');
    cy.get('#dobd-error.govuk-error-message').should('exist');
  }

  static dobdYearMustHaveFourDigits() {
    cy.get('.error-summary').contains('There is a problem');
    cy.get('.govuk-error-summary__list > li').contains('Year must be 4 digits long');
    cy.get('#dobd-error.govuk-error-message').should('exist');
  }
}

module.exports = DeathSearchPage;
