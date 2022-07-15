'use strict';

const SearchPage = require('../SearchPage');

class UserActivitySearchPage extends SearchPage {

  /**
   * Navigate to user activity audit page
   */
  static visit() {
    cy.visit('/audit/user-activity');
  }

  /**
   * Check user activity audit page is visible
   */
  static shouldBeVisible() {

    // Has title
    cy.get('h1').contains('Audit information');

    // Has labels
    cy.get('label[for=dateFrom-day]').contains('Day');
    cy.get('label[for=dateFrom-month]').contains('Month');
    cy.get('label[for=dateFrom-year]').contains('Year');

    cy.get('label[for=dateTo-day]').contains('Day');
    cy.get('label[for=dateTo-month]').contains('Month');
    cy.get('label[for=dateTo-year]').contains('Year');

    cy.get('label[for=userFilter]').contains('User filter');
    cy.get('label[for=weekendCheckbox]').contains('Include weekends?');
  }

  static performSearch({
    dateFrom,
    dateTo,
    weekendCheckbox,
    userFilter
  }) {
    this.setText('#dateFrom-day', dateFrom && dateFrom.day);
    this.setText('#dateFrom-month', dateFrom && dateFrom.month);
    this.setText('#dateFrom-year', dateFrom && dateFrom.year);
    this.setText('#dateTo-day', dateTo && dateTo.day);
    this.setText('#dateTo-month', dateTo && dateTo.month);
    this.setText('#dateTo-year', dateTo && dateTo.year);
    this.setText('#userFilter', userFilter);
    this.setText('#weekends', weekendCheckbox);
    this.submit();
  }

  static checkboxTicked(boolean) {
    cy.get('#weekendCheckbox').should(boolean ? 'be.checked' : 'not.be.checked');
  }

  static invalidDay(field) {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Enter a day using numbers only');
    cy.get(`#${field}-error.govuk-error-message`).should('exist');
  }

  static invalidMonth(field) {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Enter a month using numbers only');
    cy.get(`#${field}-error.govuk-error-message`).should('exist');
  }

  static invalidYear(field) {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Enter a year using numbers only');
    cy.get(`#${field}-error.govuk-error-message`).should('exist');
  }

  static dateInFuture(field) {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Please enter a date in the past');
    cy.get(`#${field}-error.govuk-error-message`).should('exist');
  }
}

module.exports = UserActivitySearchPage;
