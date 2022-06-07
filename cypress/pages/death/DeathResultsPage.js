'use strict';

const ResultsPage = require('../ResultsPage');
const {multipleResults: expectedMultipleRec} = require("../../fixtures/birth/birth");

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
    for (let index = 0; index < results.length; index++) {
      const { deceased } = results[index];
      const offset = index * 4;

      cy.get('tbody tr').eq(offset + 0).contains(`${deceased.forenames} ${deceased.surname}`);
      cy.get('tbody tr').eq(offset + 1).contains(`Date of birth ${deceased.dateOfBirth}`);
      cy.get('tbody tr').eq(offset + 2).contains(`Address ${deceased.address}`);
      cy.get('tbody tr').eq(offset + 3).contains(`Date of death ${deceased.dateOfDeath}`);
    }
  }
}

module.exports = DeathResultsPage;
