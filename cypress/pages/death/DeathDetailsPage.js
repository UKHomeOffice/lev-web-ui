'use strict';

const DetailsPage = require('../DetailsPage');

class DeathDetailsPage extends DetailsPage {

  /**
   * Check death registrations details page is visible
   */
  static shouldBeVisible() {
    cy.url().should('include', '/death/details');
  }

  /**
   * Check death registrations details page has the expected result
   */
  static hasExpectedTitle(record) {
    const { deceased } = record;
    cy.get('h1').contains(`${deceased.forenames} ${deceased.surname} ${deceased.dateOfBirth}`);
  }

  /**
   * Visit the death details page directly
   *
   * @param systemNumber
   */
  static visit(systemNumber) {
    cy.visit(`/death/details/${systemNumber}`);
  }

  /**
   * Check death registrations details page has the expected data
   */
  static hasCompleteRecord(record) {
    const { deceased, registrar } = record;
    const rows = [
      'Record reference',
      `System number ${record.id}`,

      'Deceased',
      `Name ${deceased.forenames} ${deceased.surname}`,
      `Date of birth ${deceased.dateOfBirth}`,
      `Sex ${deceased.sex}`,
      `Address ${deceased.address}`,
      `Date of death ${deceased.dateOfDeath}`,

      'Registration',
      `Sub-district ${registrar.subdistrict}`,
      `District ${registrar.district}`,
      `Administrative area ${registrar.administrativeArea}`,
      `Date of registration ${record.date}`,
    ];

    this.hasExpectedRows(rows);
  }
}

module.exports = DeathDetailsPage;
