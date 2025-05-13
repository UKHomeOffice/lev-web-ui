'use strict';

const SearchPage = require('../SearchPage');

class DeathSearchPage extends SearchPage {

  /**
   * Navigate to death registration search page
   */
  static visit() {
    cy.visit('/death');
  }

  /**
   * Check death registrations search page is visible
   */
  static shouldBeVisible() {

    // Has title
    cy.get('h1').contains('Applicant\'s details');

    // Has labels
    cy.get('label[for=system-number]').contains('System number from death certificate');
    cy.get('label[for=surname]').contains('Surname');
    cy.get('label[for=forenames]').contains('Forename(s)');
    cy.get('label[for=dobd-day]').contains('Day');
    cy.get('label[for=dobd-month]').contains('Month');
    cy.get('label[for=dobd-year]').contains('Year');
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
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Please enter a surname');
    cy.get('.govuk-error-summary__list > li').contains('Please enter at least one forename');
    cy.get('.govuk-error-summary__list > li').contains('Please enter a date of birth or death');
  }

  static noSystemNumber() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Please enter a number');
    cy.get('#death-system-number-hint').should('exist');
  }

  static invalidLengthSystemNumber() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('The system number should be 9 digits');
    cy.get('#death-system-number-hint').should('exist');
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

  static invalidDay() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Enter a day using numbers only');
    cy.get('#dobd-error.govuk-error-message').should('exist');
  }

  static invalidMonth() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Enter a month using numbers only');
    cy.get('#dobd-error.govuk-error-message').should('exist');
  }

  static invalidYear() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Enter a year using numbers only');
    cy.get('#dobd-error.govuk-error-message').should('exist');
  }

  static dateInFuture() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Please enter a date of birth or death in the past');
    cy.get('#dobd-error.govuk-error-message').should('exist');
  }
}

module.exports = DeathSearchPage;
