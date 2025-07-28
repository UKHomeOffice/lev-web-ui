'use strict';

const DetailsPage = require('../DetailsPage');

class MarriageDetailsPage extends DetailsPage {

  /**
   * Check marriage registrations details page is visible
   */
  static shouldBeVisible() {
    cy.url().should('include', '/marriage/details');
  }

  /**
   * Check marriage registrations details page has the expected result
   */
  static hasExpectedTitle(record) {
    const { bride, groom } = record;
    cy.get('h1').contains(`${bride.forenames} ${bride.surname} & ${groom.forenames} ${groom.surname}`);
  }

  /**
   * Check marriage registrations details page has the expected data
   */
  static hasCompleteRecord(record) {
    const { groom, bride, registrar } = record;
    const rows = [
      'Record reference',
      `System or entry number ${record.id}`,
      'Marriage details',
      `Date of marriage ${record.dateOfMarriage}`,
      `Place of marriage ${record.placeOfMarriage.address} ${record.placeOfMarriage.parish}`,

      'Partner 1',
      `Last name ${groom.surname}`,
      `First and middle names ${groom.forenames}`,
      `Address ${groom.address}`,

      'Partner 2',
      `Last name ${bride.surname}`,
      `First and middle names ${bride.forenames}`,
      `Address ${bride.address}`,

      'Registration',
      `District ${registrar.district}`,
      `Administrative area ${registrar.administrativeArea}`,
    ];

    this.hasExpectedRows(rows);
  }

  static hasEditSearchButton() {
    cy.get('#editSearch').should('exist');
  }

  static backToSearchResultsNotDisplayed() {
    cy.get('#backToSearchResults').should('not.exist');
  }

  static backToSearchResultsLinkDisplayed() {
    cy.get('.govuk-back-link').should('exist');
  }
}

module.exports = MarriageDetailsPage;
