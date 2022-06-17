'use strict';

const ResultsPage = require('../ResultsPage');

class MarriageResultsPage extends ResultsPage {

  /**
   * Check marriage registrations results page is visible
   */
  static shouldBeVisible() {
    super.shouldBeVisible();
    cy.url().should('include', '/marriage');
  }

  /**
   * Check expected title is displayed
   *
   * @param expected
   */
  static hasExpectedTitle(expected) {
    const { search, results } = expected;
    const title = `${results.length === 0 ? 'No' : results.length} records found for ${search.forenames} ${search.surname} ${search.dom.day}/${search.dom.month}/${search.dom.year}`;

    cy.get('h1').contains(title);
  }

  /**
   * Check expected results are displayed
   *
   * @param results
   */
  static hasExpectedResults(results) {
    cy.get('#records li').each((element, index) => {
      const { dateOfMarriage, placeOfMarriage, groom, bride } = results[index];

      cy.wrap(element).contains('a', `${groom.forenames} ${groom.surname} & ${bride.forenames} ${bride.surname}`);
      cy.wrap(element).contains('tr', `Date of marriage ${dateOfMarriage}`);
      cy.wrap(element).contains('tr', `Place of marriage ${placeOfMarriage.short}`);
    });
  }

  static hasEditSearchButton() {
    cy.get('#editSearch').should('exist');
  }

  static backToSearchResultsNotDisplayed() {
    cy.get('#backToSearchResults').should('not.exist');
  }

  static hasNewSearchButton() {
    cy.get('#newSearch').should('exist');
  }

  static hasExpectedFlags(results) {
    for (let index = 0; index < results.length; index++) {
      const flag = results[index];

      cy.get('.flag').eq(index).contains(flag);
    }
  }
}

module.exports = MarriageResultsPage;
