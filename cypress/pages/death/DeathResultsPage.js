'use strict';

const ResultsPage = require('../ResultsPage');

class DeathResultsPage extends ResultsPage {

  /**
   * Check death registrations results page is visible
   */
  static shouldBeVisible() {
    super.shouldBeVisible();
    cy.url().should('include', '/death');
  }

  /**
   * Check expected title is displayed
   *
   * @param expected
   */
  static hasExpectedTitle(expected) {
    const { search, results } = expected;
    const title = `${results.length === 0 ? 'No' : results.length} records found for ${search.forenames} ${search.surname} ${search.dobd.day}/${search.dobd.month}/${search.dobd.year}`;

    cy.get('h1').contains(title);
  }

  /**
   * Check expected results are displayed
   *
   * @param results
   */
  static hasExpectedResults(results) {
    cy.get('tbody tr').eq(0).contains(`${results[0].deceased.forenames} ${results[0].deceased.surname}`);
    cy.get('tbody tr').eq(1).contains(`Date of birth ${results[0].deceased.dateOfBirth}`);
    cy.get('tbody tr').eq(2).contains(`Address ${results[0].deceased.address}`);
    cy.get('tbody tr').eq(3).contains(`Date of death ${results[0].deceased.dateOfDeath}`);

    cy.get('tbody tr').eq(4).contains(`${results[1].deceased.forenames} ${results[2].deceased.surname}`);
    cy.get('tbody tr').eq(5).contains(`Date of birth ${results[1].deceased.dateOfBirth}`);
    cy.get('tbody tr').eq(6).contains(`Address ${results[1].deceased.address}`);
    cy.get('tbody tr').eq(7).contains(`Date of death ${results[1].deceased.dateOfDeath}`);

    cy.get('tbody tr').eq(8).contains(`${results[2].deceased.forenames} ${results[1].deceased.surname}`);
    cy.get('tbody tr').eq(9).contains(`Date of birth ${results[2].deceased.dateOfBirth}`);
    cy.get('tbody tr').eq(10).contains(`Address ${results[2].deceased.address}`);
    cy.get('tbody tr').eq(11).contains(`Date of death ${results[2].deceased.dateOfDeath}`);
  }

  static hasExpectedFlags(results) {
    for (let index = 0; index < results.length; index++) {
      const flag = results[index];

      cy.get('.flag').eq(index).contains(flag);
    }
  }
}

module.exports = DeathResultsPage;
