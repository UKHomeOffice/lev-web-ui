'use strict';

const ResultsPage = require('../ResultsPage');

class PartnershipResultsPage extends ResultsPage {

  /**
   * Check partnership registrations results page is visible
   */
  static shouldBeVisible() {
    super.shouldBeVisible();
    cy.url().should('include', '/partnership');
  }

  /**
   * Check expected title is displayed
   *
   * @param expected
   */
  static hasExpectedTitle(expected) {
    const { search, results } = expected;
    const title = `${results.length === 0 ? 'No' : results.length} records found for ${search.forenames} ${search.surname} ${search.dop.day}/${search.dop.month}/${search.dop.year}`;

    cy.get('h1').contains(title);
  }

  /**
   * Check expected results are displayed
   *
   * @param results
   */
  static hasExpectedResults(results) {
    cy.get('#records li').each((element, index) => {
      const { dateOfPartnership, placeOfPartnership, partner1, partner2 } = results[index];

      cy.wrap(element).contains('a', `${partner1.forenames} ${partner1.surname} & ${partner2.forenames} ${partner2.surname}`);
      cy.wrap(element).contains('tr', `Date of civil partnership ${dateOfPartnership}`);
      cy.wrap(element).contains('tr', `Place of civil partnership ${placeOfPartnership.short}`);
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

module.exports = PartnershipResultsPage;
