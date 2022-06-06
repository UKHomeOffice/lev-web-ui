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
    this.setText('#dobd-day', dobd.day);
    this.setText('#dobd-month', dobd.month);
    this.setText('#dobd-year', dobd.year);
    this.submit();
  }

  /**
   * Check the date of birth/death has focus
   */
  static hasDateOfBirthOrDeathFocused() {
    cy.get('#dobd').should('have.focus');
  }

  /**
   * Check the date of birth/death hint is visible
   */
  static hasDateOfBirthOrDeathHint() {
    cy.get('#dobd-extended-hint').should('exist');
  }

  /**
   * Check the search page has the expected values
   *
   * @param systemNumber
   * @param surname
   * @param forenames
   * @param dobd
   */
  static hasExpectedValues({
                             systemNumber,
                             surname,
                             forenames,
                             dobd
                           }) {
    cy.get('#system-number').should('have.value', systemNumber);
    cy.get('#surname').should('have.value', surname);
    cy.get('#forenames').should('have.value', forenames);
    cy.get('#dobd').should('have.value', dobd);
  }
}

module.exports = DeathSearchPage;
