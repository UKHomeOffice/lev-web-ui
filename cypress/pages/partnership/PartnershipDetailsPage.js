'use strict';

const DetailsPage = require('../DetailsPage');

class PartnershipDetailsPage extends DetailsPage {

  /**
   * Check partnership registrations details page is visible
   */
  static shouldBeVisible() {
    cy.url().should('include', '/partnership/details');
  }

  /**
   * Check partnership registrations details page has the expected result
   */
  static hasExpectedTitle(record) {
    const { partner1, partner2 } = record;
    cy.get('h1').contains(`${partner2.forenames} ${partner2.surname} & ${partner1.forenames} ${partner1.surname}`);
  }

  /**
   * Check partnership registrations details page has the expected data
   */
  static hasCompleteRecord(record) {
    const { partner1, partner2, registrar } = record;
    const rows = [
      'Record reference',
      `Entry number ${record.id}`,
      'Civil partnership details',
      `Date of civil partnership ${record.dateOfPartnership}`,
      `Place of civil partnership ${record.placeOfPartnership.address}`,

      'Partner 1',
      `Last name ${partner1.surname}`,
      `First and middle names ${partner1.forenames}`,
      `Address ${partner1.address}`,

      'Partner 2',
      `Last name ${partner2.surname}`,
      `First and middle names ${partner2.forenames}`,
      `Address ${partner2.address}`,

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

module.exports = PartnershipDetailsPage;
