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
  static hasLimitedRecord(record) {
    const { partner1, partner2, registrar } = record;
    const rows = [
      `Entry number ${record.id}`,
      `Date of civil partnership ${record.dateOfPartnership}`,
      `Place of civil partnership ${record.placeOfPartnership.address}`,

      'Partner 1',
      `Surname ${partner1.surname}`,
      `Forename(s) ${partner1.forenames}`,
      `Address ${partner1.address}`,

      'Partner 2',
      `Surname ${partner2.surname}`,
      `Forename(s) ${partner2.forenames}`,
      `Address ${partner2.address}`,

      'Registration',
      `District ${registrar.district}`,
      `Administrative area ${registrar.administrativeArea}`,
    ];

    this.hasExpectedRows(rows);
  }

  /**
   * Check partnership registrations details page has the expected data
   */
  static hasCompleteRecord(record) {
    const { partner1, partner2, fatherOfPartner1, motherOfPartner1, fatherOfPartner2, motherOfPartner2,  registrar } = record;
    const rows = [
      `Entry number ${record.id}`,
      `Date of civil partnership ${record.dateOfPartnership}`,
      `Place of civil partnership ${record.placeOfPartnership.address}`,

      'Partner 1',
      `Surname ${partner1.surname}`,
      `Forename(s) ${partner1.forenames}`,
      `Date of birth ${partner1.dob}`,
      `Occupation ${partner1.occupation}`,
      `Address ${partner1.address}`,
      `Condition ${partner1.condition}`,
      `Signature ${partner1.signature}`,

      'Partner 2',
      `Surname ${partner2.surname}`,
      `Forename(s) ${partner2.forenames}`,
      `Date of birth ${partner2.dob}`,
      `Occupation ${partner2.occupation}`,
      `Address ${partner2.address}`,
      `Condition ${partner2.condition}`,
      `Signature ${partner2.signature}`,

      'Father of partner 1',
      `Surname ${fatherOfPartner1.surname}`,
      `Forename(s) ${fatherOfPartner1.forenames}`,
      `Occupation ${fatherOfPartner1.occupation}`,
      `Designation ${fatherOfPartner1.designation || ''}`,
      `Deceased ${fatherOfPartner1.deceased ? 'Yes' : 'No'}`,

      'Mother of partner 1',
      `Surname ${motherOfPartner1.surname}`,
      `Forename(s) ${motherOfPartner1.forenames}`,
      `Occupation ${motherOfPartner1.occupation}`,
      `Designation ${motherOfPartner1.designation || ''}`,
      `Deceased ${motherOfPartner1.deceased ? 'Yes' : 'No'}`,

      'Father of partner 2',
      `Surname ${fatherOfPartner2.surname}`,
      `Forename(s) ${fatherOfPartner2.forenames}`,
      `Occupation ${fatherOfPartner2.occupation}`,
      `Designation ${fatherOfPartner2.designation || ''}`,
      `Deceased ${fatherOfPartner2.deceased ? 'Yes' : 'No'}`,

      'Mother of partner 2',
      `Surname ${motherOfPartner2.surname}`,
      `Forename(s) ${motherOfPartner2.forenames}`,
      `Occupation ${motherOfPartner2.occupation}`,
      `Designation ${motherOfPartner2.designation || ''}`,
      `Deceased ${motherOfPartner2.deceased ? 'Yes' : 'No'}`,

      'First witness',
      `Signature ${record.witness1.forename} ${record.witness1.surname}`,

      'Second witness',
      `Signature ${record.witness2.forename} ${record.witness2.surname}`,

      'Registration',
      `Registrar signature ${registrar.signature}`,
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
