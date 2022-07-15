'use strict';

const ResultsPage = require('../ResultsPage');
const { DateTime } = require('luxon');

class UserActivityResultsPage extends ResultsPage {

  /**
   * Check partnership registrations results page is visible
   */
  static shouldBeVisible() {
    cy.url().should('include', '/audit/user-activity/results');
  }

  static recordsFound(record) {
    const { dateFrom, dateTo, userFilter } = record;
    const dateFromString = DateTime.fromObject(dateFrom).toFormat('dd/MM/yyyy');
    const dateToString = DateTime.fromObject(dateTo).toFormat('dd/MM/yyyy');

    cy.get('#header')
      .contains(`Showing audit data ${userFilter ? `for ${userFilter} ` : ''}from ${dateFromString} to ${dateToString}`);
  }

  static toggleWeekendViewCheckbox() {
    cy.get('#weekends').click();
  }

  static checkboxTicked(ticked = false) {
    cy.get('#weekends').should(ticked ? 'be.checked' : 'not.be.checked');
    return ticked;
  }

  static userDisplayed(user) {
    cy.get('table.audit > tbody > tr > th').contains(String(user));
  }

  static columnForEachDayWithCount() {
    cy.get('table.audit > tbody > tr:first > th ~ td').should('have.length', 8);
  }

  static lastRowDayTotals() {
    cy.get('table.audit > tbody > tr:last > th').contains('Day totals');
  }

  static periodTotalsAccurate() {
    const toStrings = (cells$) => Cypress._.map(cells$, 'textContent');
    const toNumbers = (texts) => Cypress._.map(texts, Number);
    const sum = (numbers) => Cypress._.sum(numbers);

    cy.get('table.audit > tbody > tr:first > th ~ td')
      .then(toStrings)
      .then(toNumbers)
      .then(sum)
      .then(cellsTotal => {
        cy.get('table.audit > tbody > tr:first > th ~ td:last')
          .then(toStrings)
          .then(toNumbers)
          .then(sum)
          .should('eq', cellsTotal / 2);
      });
  }

  static dayTotalsAccurate() {
    const toStrings = (cells$) => Cypress._.map(cells$, 'textContent');
    const toNumbers = (texts) => Cypress._.map(texts, Number);
    const sum = (numbers) => Cypress._.sum(numbers);

    cy.get('table.audit > tbody > tr > th + td')
      .then(toStrings)
      .then(toNumbers)
      .then(sum)
      .then(cellsTotal => {
        cy.get('table.audit > tbody > tr > th + td:last')
          .then(toStrings)
          .then(toNumbers)
          .then(sum)
          .should('eq', cellsTotal / 2);
      });
  }

  static singleRecordDisplayed() {
    cy.get('table.audit > tbody > tr').should('have.length', 1);
  }

  static noRecordsFound(record) {
    const { dateFrom, dateTo, userFilter } = record;

    cy.get('#header')
      .contains(`No usage data found ${userFilter ? `for ${userFilter} ` : ''}from ${dateFrom.day}/${dateFrom.month}/${dateFrom.year} to ${dateTo.day}/${dateTo.month}/${dateTo.year}`);
  }

  static hasEditSearchButton() {
    cy.get('#editSearch').should('exist');
  }

  static backToSearchResultsDisplayed() {
    cy.get('.govuk-back-link').should('exist');
  }

  static hasNewSearchButton() {
    cy.get('#newSearch').should('exist');
  }

  static exportCSVDisplayed() {
    cy.get('#exportToCSV').should('exist');
  }
}

module.exports = UserActivityResultsPage;
